using System.Web.Http;
using System.Web.Http.Cors;
using TrafalgarBattleAPI.Controllers.Cryptography;
using TrafalgarBattleAPI.Models;

namespace TrafalgarBattleAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserLoginController : ApiController
    {
        UserDbConnection udc = null;

        // POST: api/UserLogin
        public User Post([FromBody]UserLogin UserLogin)
        {
            udc = new UserDbConnection();

            User user = udc.GetUser(UserLogin.Username, SHA.GenerateSHA256String(UserLogin.Password));

            return user;
        }
    }
}
