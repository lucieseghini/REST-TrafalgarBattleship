using System.Collections.Generic;
using System.Linq;
using TrafalgarBattleAPI.Models.Boards;

namespace TrafalgarBattleAPI.Extensions
{
    public static class CaseExtensions
    {
        public static Case At(this List<Case> cases, int row, int column)
        {
            return cases.First(x => x.Coordinate.Row == row && x.Coordinate.Column == column);
        }

        public static List<Case> Range(this List<Case> cases, int startRow, int startColumn, int endRow, int endColumn)
        {
            return cases.Where(x => x.Coordinate.Row >= startRow
                                     && x.Coordinate.Column >= startColumn
                                     && x.Coordinate.Row <= endRow
                                     && x.Coordinate.Column <= endColumn).ToList();
        }
    }
}