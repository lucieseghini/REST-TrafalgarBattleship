using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using TrafalgarBattleAPI.Models;

namespace TrafalgarBattleAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LeaderboardController : ApiController
    {
        UserDbConnection udc = null;

        // GET api/<controller>
        public IEnumerable<User> Get()
        {
            udc = new UserDbConnection();

            List<User> leaderboard = udc.GetLeaderboard();

            return leaderboard;
        }

        // GET api/<controller>/5
        public User Get(string id)
        {
            udc = new UserDbConnection();

            List<User> leaderboard = udc.GetLeaderboard();
            User user = leaderboard.FirstOrDefault((u) => u.Name == id);

            return user;
        }
    }
}