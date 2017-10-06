namespace TrafalgarBattleAPI.Models.Ships
{
    public class Submarine : Ship
    {
        public Submarine()
        {
            Name = "Submarine";
            Width = 3;
            State = Boards.State.Submarine;
        }
    }
}