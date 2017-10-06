using System.Web.Http;
using System.Web.Http.Cors;
using TrafalgarBattleAPI.Controllers.Cryptography;
using TrafalgarBattleAPI.Models;

namespace TrafalgarBattleAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserSignUpController : ApiController
    {
        UserDbConnection udc = null;

        // POST: api/UserSignUp
        public User Post([FromBody]UserSignUp userSignUp)
        {
            udc = new UserDbConnection();

            if( userSignUp.Username != null && userSignUp.Password != null && userSignUp.PasswordConfirmation == userSignUp.Password )
            {
                udc.InsertUser(userSignUp.Username, SHA.GenerateSHA256String(userSignUp.Password));
            }

            User user = udc.GetUser(userSignUp.Username, SHA.GenerateSHA256String(userSignUp.Password));
            return user;
        }
    }
}
