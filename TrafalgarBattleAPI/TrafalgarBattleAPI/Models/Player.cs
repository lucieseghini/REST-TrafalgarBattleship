using System;
using System.Collections.Generic;
using System.Linq;
using TrafalgarBattleAPI.Extensions;
using TrafalgarBattleAPI.Models.Ships;
using TrafalgarBattleAPI.Models.Boards;

namespace TrafalgarBattleAPI.Models
{
    public class Player : User
    {
        public PlayerGrid PlayerGrid { get; set; }
        public PlayerGrid ShotGrid { get; set; }
        public List<Ship> Ships { get; set; }
        public bool IsTurn { get; set; }
        public bool HasLost
        {
            get
            {
                return Ships.All(x => x.IsSunk);
            }
        }

        public Player(User user) : base(user.ConnectionId, user.Name)
        {
            IdUser = user.IdUser;
            Rank = user.Rank;
            Avatar = user.Avatar;
            Victory = user.Victory;
            Defeat = user.Defeat;
            Ships = new List<Ship>
            {
                new Destroyer(),               
                new Submarine(),
                new Cruiser(),
                new Carrier(),
                new Battleship()  
            };
            PlayerGrid = new PlayerGrid();
            ShotGrid = new PlayerGrid();
            IsTurn = false;
        }

        public ShotResult ProcessShot(Coordinate coordinate)
        {
            if (!PlayerGrid.Search(coordinate.Row, coordinate.Column).IsOccupied)
            {
                return ShotResult.Miss;
            }
            Ship ship = Ships.First(x => x.State == PlayerGrid.Search(coordinate.Row, coordinate.Column).State);
            ship.Hits++;
            return ship.IsSunk ? ShotResult.Sunk : ShotResult.Hit;
        }

        public void ProcessShotResult(Coordinate coords, ShotResult result)
        {
            Case c = ShotGrid.Cases.At(coords.Row, coords.Column);
            c.IsHit = true;
            switch (result)
            {
                case ShotResult.Hit:
                    c.State = State.Hit;
                    break;

                case ShotResult.Sunk:
                    c.State = State.Sunk;
                    break;

                default:
                    c.State = State.Miss;
                    break;
            }
        }

        public void PlaceRandomShips()
        {
            var rand = new Random(Guid.NewGuid().GetHashCode());
            foreach (Ship ship in Ships)
            {
                bool isOpen = true;
                while (isOpen)
                {
                    int startcolumn = rand.Next(0, 10);
                    int startrow = rand.Next(0, 10);
                    int endrow = startrow, endcolumn = startcolumn;
                    int orientation = rand.Next(1, 101) % 2;

                    if (orientation == 0)
                    {
                        for (int i = 1; i < ship.Width; i++)
                        {
                            endrow++;
                        }
                    }
                    else
                    {
                        for (int i = 1; i < ship.Width; i++)
                        {
                            endcolumn++;
                        }
                    }

                    if (endrow > 9 || endcolumn > 9)
                    {
                        continue;
                    }

                    List<Case> affectedCases = PlayerGrid.Cases.Range(startrow, startcolumn, endrow, endcolumn);
                    if (affectedCases.Any(x => x.IsOccupied))
                    {
                        continue;
                    }

                    foreach (Case c in affectedCases)
                    {
                        c.State = ship.State;
                    }
                    isOpen = false;
                }
            }
        }
        
        public void UpdateScoreOnVictory()
        {
            UserDbConnection udc = new UserDbConnection();

            udc.UpdateUserOnVictory(IdUser);
        }

        public void UpdateScoreOnDefeat()
        {
            UserDbConnection udc = new UserDbConnection();

            udc.UpdateUserOnDefeat(IdUser);
        }
    }
}