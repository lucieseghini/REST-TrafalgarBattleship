using TrafalgarBattleAPI.Models.Boards;

namespace TrafalgarBattleAPI.Models.Ships
{
    public abstract class Ship
    {
        public string Name { get; set; }
        public int Width { get; set; }
        public int Hits { get; set; }
        public State State { get; set; }
        public bool IsSunk => Hits >= Width;
    }
}