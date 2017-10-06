namespace TrafalgarBattleAPI.Models.Ships
{
    public class Battleship : Ship
    {
        public Battleship()
        {
            Name = "Battleship";
            Width = 4;
            State = Boards.State.Battleship;
        }
    }
}