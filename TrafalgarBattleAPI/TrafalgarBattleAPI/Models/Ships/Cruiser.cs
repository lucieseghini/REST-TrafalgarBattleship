namespace TrafalgarBattleAPI.Models.Ships
{
    public class Cruiser : Ship
    {
        public Cruiser()
        {
            Name = "Cruiser";
            Width = 3;
            State = Boards.State.Cruiser;
        }
    }
}