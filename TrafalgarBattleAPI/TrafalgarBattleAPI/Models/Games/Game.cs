namespace TrafalgarBattleAPI.Models.Games
{
    public class Game
    {
        public int IdGame { get; set; }
        public Player Player1 { get; set; }
        public Player Player2 { get; set; }
        public string FirstToPlay { get; set; }

        public Game(int idGame, Player player1, Player player2)
        {
            IdGame = idGame;
            Player1 = player1;
            Player2 = player2;
            FirstToPlay = Player1.ConnectionId;
            Player1.IsTurn = true;
        }

        public Player GetPlayer(string connectionId)
        {
            return (Player1.ConnectionId == connectionId ? Player1 : (Player2.ConnectionId == connectionId) ? Player2 : null);
        }

        public Player GetOpponentPlayer(string connectionId)
        {
            return (Player1.ConnectionId == connectionId ? Player2 : (Player2.ConnectionId == connectionId) ? Player1 : null);
        }
    }
}