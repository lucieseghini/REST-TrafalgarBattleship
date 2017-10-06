using System.Collections.Generic;
using TrafalgarBattleAPI.Models.Games;

namespace TrafalgarBattleAPI.Hubs
{
    public class GameList
    {
        private List<Game> _gamelist = 
            new List<Game>();


        public void Add(Game game)
        {
            lock (_gamelist)
            {
                if(!_gamelist.Contains(game))
                {
                    _gamelist.Add(game);
                }
            }
        }

        public void Remove(Game game)
        {
            lock (_gamelist)
            {
                if (_gamelist.Contains(game))
                {
                    _gamelist.Remove(game);
                }
            }
        }

        public Game GetGame(int idGame)
        {
            foreach(var g in _gamelist)
            {
                if (g.IdGame == idGame)
                {
                    return g;
                }
            }
            return null;
        }

        public List<Game> GetAllGames()
        {
            return _gamelist;
        }
    }
}