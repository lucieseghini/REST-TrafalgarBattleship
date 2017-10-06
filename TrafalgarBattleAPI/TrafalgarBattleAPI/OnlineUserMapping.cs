using System.Collections.Generic;
using TrafalgarBattleAPI.Models;

namespace TrafalgarBattleAPI
{
    public class OnlineUserMapping<T>
    {
        private readonly Dictionary<T, User> OnlineUsers =
            new Dictionary<T, User>();

        public bool Add(T key, User user)
        {
            lock (OnlineUsers)
            {
                if (!OnlineUsers.TryGetValue(key, out User u))
                {
                    OnlineUsers.Add(key, user);
                    return true;
                }
                return false;
            }
        }

        public User GetOnlineUser(T key)
        {
            if (OnlineUsers.TryGetValue(key, out User user))
            {
                return user;
            }
            return null;
        }

        public bool Remove(T key)
        {
            lock (OnlineUsers)
            {
                if (OnlineUsers.TryGetValue(key, out User u))
                {
                    return OnlineUsers.Remove(key);
                }
                return false;
            }
        }

        public List<User> GetAllUsers()
        {
            List<User> users = new List<User>();
            foreach(var onlineUser in OnlineUsers)
            {
                users.Add(onlineUser.Value);
            }
            return users;
        }
    }
}