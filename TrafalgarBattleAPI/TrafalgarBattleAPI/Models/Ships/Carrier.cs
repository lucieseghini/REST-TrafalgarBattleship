namespace TrafalgarBattleAPI.Models.Ships
{
    public class Carrier : Ship
    {
        public Carrier()
        {
            Name = "Carrier";
            Width = 5;
            State = Boards.State.Carrier;
        }
    }
}