namespace TrafalgarBattleAPI.Models.Ships
{
    public class Destroyer : Ship
    {
        public Destroyer()
        {
            Name = "Destroyer";
            Width = 2;
            State = Boards.State.Destroyer;
        }
    }
}