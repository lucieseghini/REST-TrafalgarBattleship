using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrafalgarBattleAPI.Models;
using TrafalgarBattleAPI.Models.Boards;
using TrafalgarBattleAPI.Models.Games;

namespace TrafalgarBattleAPI.Hubs
{
    public class OnlineUserStore : Hub
    {
        private readonly static OnlineUserMapping<string> OnlineUserMap =
            new OnlineUserMapping<string>();

        private readonly static GameList Gamelist = new GameList();

        private static int Iduser = 0;
        private static int IdGame = 0;

        private static readonly log4net.ILog log = log4net.LogManager.GetLogger
                (System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);



        // This method is automatically called when a client disconnect from the websocket
        public override Task OnDisconnected(bool stopCalled)
        {
            // Try to remove the client from the OnlineUser list and notify all OnlineUser that the list has changed
            if (OnlineUserMap.Remove(Context.ConnectionId))
            {
                List<User> userlist = OnlineUserMap.GetAllUsers();

                Clients.All.updateOnlineUserList(userlist);
            }

            // Search if the client is taking part of a game. Notify the opponent if it is the case and remove the game from the list.
            List<Game> games = Gamelist.GetAllGames();
            foreach(Game g in games)
            {
                if(g.GetPlayer(Context.ConnectionId) != null)
                {
                    Player player = g.GetOpponentPlayer(Context.ConnectionId);
                    if(player != null && player.ConnectionId != null)
                    {
                        player.UpdateScoreOnVictory();

                        Clients.Client(player.ConnectionId).notifyOpponentDisconnected();
                    }
                    Gamelist.Remove(g);
                    break;
                }
            }

            return base.OnDisconnected(stopCalled);
        }

        public void Connect(int iduser, string name, string avatar, int victory, int defeat)
        {
            User user = new User(Context.ConnectionId, iduser, name, avatar, victory, defeat);
            if(user != null)
            {
                OnlineUserMap.Add(user.ConnectionId, user);

                List<User> userlist = OnlineUserMap.GetAllUsers();

                Clients.All.updateOnlineUserList(userlist);
                Clients.Caller.setUser(user);
            }
        }

        // Manual disconnection from OnlineUser list when ChallengeUser component is unmounted. Notify all clients that the list has changed 
        public void Disconnect()
        {
            if (OnlineUserMap.Remove(Context.ConnectionId))
            {
                List<User> userlist = OnlineUserMap.GetAllUsers();
                Clients.All.updateOnlineUserList(userlist);
            }          
        }

        public void SearchOnlineUser(string name)
        {
            List<User> userlist = OnlineUserMap.GetAllUsers();
            User user = userlist.FirstOrDefault((u) => u.Name == name);

            if(user != null)
            {
                Clients.Caller.renderSearchOnlineUser(user);
            }
        }

        // Create a default user for client without register account and return it to the client.
        public void CreateUserFromName(string name)
        {
            User _user = new User(Context.ConnectionId, Iduser++, name);
            if (OnlineUserMap.Add(_user.ConnectionId, _user))
            {
                Clients.Caller.setUser(_user);

                List<User> userlist = OnlineUserMap.GetAllUsers();
                Clients.All.updateOnlineUserList(userlist);
            }
        }

        // Method called on user challenging another user. Send notification to opponent.
        public void ChallengeUser(string targetConnectionId, string defiedUserName, string challengerConnectionId, string challengerName)
        {
            User targetUser = OnlineUserMap.GetOnlineUser(targetConnectionId);
            User challengerUser = OnlineUserMap.GetOnlineUser(challengerConnectionId);

            if ( targetUser != null && challengerUser != null )
            {
                Clients.Client(targetUser.ConnectionId).defied(challengerUser);
                Clients.Caller.waitingForResponse(targetUser);
            }
            else
            {
                Clients.Caller.userDefiedDisconnected(defiedUserName);
            }   
        }


        // Method called on user accepting challenge.
        public void ChallengeAccepted(string opponentConnectionId)
        {
            User user1 = OnlineUserMap.GetOnlineUser(Context.ConnectionId);
            User user2 = OnlineUserMap.GetOnlineUser(opponentConnectionId);

            if(user1 != null && user2 != null)
            {
                // Players creation
                Player player1 = new Player(user1);
                Player player2 = new Player(user2);

                // Placing ships on players grid
                if(player1 != null && player2 != null)
                {
                    player1.PlaceRandomShips();
                    player2.PlaceRandomShips();
                }

                // Game creation, adding it to the game list, then notify players game is starting
                Game game = new Game(IdGame++, player1, player2);
                if(game != null)
                {
                    log.Info("Game " + IdGame + " : " + player1 + " " + player2);

                    Gamelist.Add(game);

                    Clients.Caller.startGame(game.IdGame, game.Player1, game.Player2);
                    Clients.Client(opponentConnectionId).startGame(game.IdGame, game.Player2, game.Player1);
                }
            }  
        }


        // Method called on a user refusing challenge.
        public void ChallengeDeclined(string challengerConnectionId)
        {
            User user = OnlineUserMap.GetOnlineUser(Context.ConnectionId);

            if(user != null && challengerConnectionId != null)
            {
                Clients.Client(challengerConnectionId).displayDeniedChallenge(user);
            }
        }

        // Method called on challenger aborting his request to play.
        public void ChallengeUserAbort(string targetConnectionId)
        {
            User caller = OnlineUserMap.GetOnlineUser(Context.ConnectionId);
            if ( caller != null )
            {
                Clients.Client(targetConnectionId).abortChallenge();
            }
        }


        // Method called by the two player at the beginning of the game to determine the one who's starting.
        public void IsFirstToPlay(int idGame, string connectionId)
        {
            Game game = Gamelist.GetGame(idGame);
            if (game != null)
            {
                 Clients.Caller.firstToPlay(game.Player1.ConnectionId == connectionId);
            }
            else
            {
                Clients.Caller.gameDoesNotExists();
            }
        }

        // Method called on each click on opponentgrid to process shot result.
        public void FireShot(int idGame, string shooterPlayerConnectionId, int row, int column)
        {
            Game game = Gamelist.GetGame(idGame);

            if(game != null)
            {
                Player targetPlayer = game.GetOpponentPlayer(shooterPlayerConnectionId);
                Player shooterPlayer = game.GetPlayer(shooterPlayerConnectionId);
                Coordinate coordinate = new Coordinate(row, column);

                ShotResult result = targetPlayer.ProcessShot(coordinate);
                shooterPlayer.ProcessShotResult(coordinate, result);
                if (result.Equals(ShotResult.Miss))
                {
                    Clients.Caller.updateShotGridOnMissedShot(shooterPlayer.ShotGrid);
                    Clients.Client(targetPlayer.ConnectionId).setTurn();
                }
                else if (result.Equals(ShotResult.Hit))
                {
                    Clients.Caller.updateShotGridOnSuccessfullShot(shooterPlayer.ShotGrid);
                    Clients.Client(targetPlayer.ConnectionId).notifyHit();
                }
                else
                {
                    if (!targetPlayer.HasLost)
                    {
                        Clients.Caller.updateShotGridOnSunkShip(shooterPlayer.ShotGrid);
                        Clients.Client(targetPlayer.ConnectionId).notifyShipHasBeenSink();
                    }
                    else
                    {
                        shooterPlayer.UpdateScoreOnVictory();
                        targetPlayer.UpdateScoreOnDefeat();

                        Clients.Caller.notifyPlayerVictory(shooterPlayer.ShotGrid);
                        Clients.Client(targetPlayer.ConnectionId).notifyPlayerDefeat();

                        Gamelist.Remove(game);
                        log.Info("Game : " + idGame + " winner : " + shooterPlayer.Name + " looser : " + targetPlayer.Name); 
                    }
                }
            }
        }
    }
}