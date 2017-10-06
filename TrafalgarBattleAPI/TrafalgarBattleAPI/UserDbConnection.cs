using Npgsql;
using NpgsqlTypes;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using TrafalgarBattleAPI.Models;

namespace TrafalgarBattleAPI
{
    public class UserDbConnection
    {
        string Conx = "Server=localhost;Port=5432;Database=TrafalgarBattleship;User Id=postgres;Password=admin;";
        NpgsqlCommand MyCmd = null;
        NpgsqlConnection MyCnx = null;

        private static readonly log4net.ILog log = log4net.LogManager.GetLogger
                (System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        // Insert a new user to the database. Invoke on SignUpForm submit.
        public int InsertUser(string name, string password)
        {
            int result = 0;

            MyCnx = new NpgsqlConnection(Conx);
            MyCnx.Open();

            if(MyCnx != null)
            {
                string insert = "INSERT INTO \"user\"(iduser,name,password,avatar,victory,defeat) values(DEFAULT,:name,:password,:avatar,:victory,:defeat)";

                MyCmd = new NpgsqlCommand(insert, MyCnx);

                if (MyCmd != null)
                {
                    MyCmd.Parameters.Add(new NpgsqlParameter("name", NpgsqlDbType.Varchar)).Value = name;
                    MyCmd.Parameters.Add(new NpgsqlParameter("password", NpgsqlDbType.Varchar)).Value = password;
                    MyCmd.Parameters.Add(new NpgsqlParameter("avatar", NpgsqlDbType.Varchar)).Value = "oldship.png";
                    MyCmd.Parameters.Add(new NpgsqlParameter("victory", NpgsqlDbType.Integer)).Value = 0;
                    MyCmd.Parameters.Add(new NpgsqlParameter("defeat", NpgsqlDbType.Integer)).Value = 0;

                    try
                    {
                        result = MyCmd.ExecuteNonQuery();
                    }
                    catch(Exception e)
                    {
                        log.Error("InsertUser", e);
                    }
                }
            }
            MyCnx.Close();

            return result;
        }

        // Search a user in the database based on his name and his password. Invoke on LoginForm submit.
        public User GetUser(string name, string password)
        {
            User user = null;

            MyCnx = new NpgsqlConnection(Conx);
            MyCnx.Open();

            if(MyCnx != null)
            {
                string select = "SELECT iduser,name,avatar,victory,defeat from \"user\" WHERE (name=:name AND password=:password);";

                MyCmd = new NpgsqlCommand(select, MyCnx);
                if(MyCmd != null)
                {
                    DataTable MyData = new DataTable();
                    NpgsqlDataAdapter da;

                    MyCmd.Parameters.Add(new NpgsqlParameter("name", NpgsqlDbType.Varchar)).Value = name;
                    MyCmd.Parameters.Add(new NpgsqlParameter("password", NpgsqlDbType.Varchar)).Value = password;

                    try
                    {
                        da = new NpgsqlDataAdapter(MyCmd);
                        da.Fill(MyData);
                    }
                    catch(Exception e)
                    {
                        log.Error("GetUser", e);
                    }
                    
                    

                    List<string> MyUserParameter = new List<string>();

                    if (MyData.Rows.Count == 1)
                    {
                        foreach (DataRow row in MyData.Rows)
                        {
                            for (int i = 0; i < MyData.Columns.Count; i++)
                            {
                                MyUserParameter.Add(row[i].ToString());
                            }
                        }
                        int.TryParse(MyUserParameter.ElementAt(0), out int iduser);
                        int.TryParse(MyUserParameter.ElementAt(3), out int victory);
                        int.TryParse(MyUserParameter.ElementAt(4), out int defeat);

                        user = new User(iduser, MyUserParameter.ElementAt(1), MyUserParameter.ElementAt(2), victory, defeat);
                    }
                }
            }
            MyCnx.Close();

            return user;
        }

        // Update all values of an user based on his iduser. Not used for now as we do not have developped any profile page.
        public int UpdateUser(int iduser, string name, string password, string avatar, int victory, int defeat)
        {
            int result = 0;

            MyCnx = new NpgsqlConnection(Conx);
            MyCnx.Open();

            if(MyCnx != null)
            {
                string update = "UPDATE  \"user\"  SET name =:name ,password=:password,avatar=:avatar,victory=:victory WHERE(iduser=:iduser);";

                MyCmd = new NpgsqlCommand(update, MyCnx);

                if(MyCmd != null)
                {
                    MyCmd.Parameters.Add(new NpgsqlParameter("iduser", NpgsqlDbType.Integer)).Value = iduser;
                    MyCmd.Parameters.Add(new NpgsqlParameter("name", NpgsqlDbType.Varchar)).Value = name;
                    MyCmd.Parameters.Add(new NpgsqlParameter("password", NpgsqlDbType.Varchar)).Value = password;
                    MyCmd.Parameters.Add(new NpgsqlParameter("avatar", NpgsqlDbType.Varchar)).Value = avatar;
                    MyCmd.Parameters.Add(new NpgsqlParameter("victory", NpgsqlDbType.Integer)).Value = victory;
                    MyCmd.Parameters.Add(new NpgsqlParameter("defeat", NpgsqlDbType.Integer)).Value = defeat;

                    try
                    {
                        result = MyCmd.ExecuteNonQuery();
                    }
                    catch(Exception e)
                    {
                        log.Error("UpdateUser", e);
                    }
                }
            }
            MyCnx.Close();

            return result;
        }

        // Delete an user from the database based on his iduser. Not used for now as we do not managed any user profile page.
        public int DeleteUserbyId(int iduser)
        {
            int result = 0;

            MyCnx = new NpgsqlConnection(Conx);
            MyCnx.Open();

            if(MyCnx != null)
            {
                string delete = "DELETE FROM \"user\" WHERE(iduser=:iduser)";

                MyCmd = new NpgsqlCommand(delete, MyCnx);
                if(MyCmd != null)
                {
                    MyCmd.Parameters.Add(new NpgsqlParameter("iduser", NpgsqlDbType.Integer)).Value = iduser;

                    try
                    {
                        result = MyCmd.ExecuteNonQuery();
                    }
                    catch(Exception e)
                    {
                        log.Error("DeleteUserById", e);
                    }
                }
                
            }
            MyCnx.Close();

            return result;
        }

        // Return the user ordered by their number of victory desc. Used to display the leaderboard screen.
        public List<User> GetLeaderboard()
        {
            List<User> leaderboard = new List<User>();

            MyCnx = new NpgsqlConnection(Conx);
            MyCnx.Open();
            if(MyCnx != null)
            {
                string select = "SELECT iduser,name,avatar,victory,defeat from \"user\" ORDER BY victory-defeat desc, name;";

                MyCmd = new NpgsqlCommand(select, MyCnx);

                if(MyCmd != null)
                {
                    DataTable MyData = new DataTable();

                    try
                    {
                        NpgsqlDataAdapter da = new NpgsqlDataAdapter(MyCmd);
                        da.Fill(MyData);
                    }
                    catch(Exception e)
                    {
                        log.Error("GetLeaderboard", e);
                    }

                    int rank = 1;
                    foreach (DataRow row in MyData.Rows)
                    {
                        List<string> MyUserParameter = new List<string>();
                        for (int i = 0; i < MyData.Columns.Count; i++)
                        {
                            MyUserParameter.Add(row[i].ToString());
                        }
                        int.TryParse(MyUserParameter.ElementAt(0), out int iduser);
                        string name = MyUserParameter.ElementAt(1);
                        string avatar = MyUserParameter.ElementAt(2);
                        int.TryParse(MyUserParameter.ElementAt(3), out int victory);
                        int.TryParse(MyUserParameter.ElementAt(4), out int defeat);

                        User user = new User(iduser, name, avatar, victory, defeat, rank);
                        if (user != null)
                        {
                            leaderboard.Add(user);
                            rank++;
                        }
                    }
                } 
            }
            MyCnx.Close();

            return leaderboard;
        }

        // Add one victory to the specified user.
        public void UpdateUserOnVictory(int iduser)
        {
            MyCnx = new NpgsqlConnection(Conx);
            MyCnx.Open();

            if(MyCnx != null)
            {
                string update = "UPDATE  \"user\"  SET victory=victory+1 WHERE iduser=:iduser;";

                MyCmd = new NpgsqlCommand(update, MyCnx);
                if(MyCmd != null)
                {
                    MyCmd.Parameters.Add(new NpgsqlParameter("iduser", NpgsqlDbType.Integer)).Value = iduser;

                    try
                    {
                        MyCmd.ExecuteNonQuery();
                    }
                    catch(Exception e)
                    {
                        log.Error("UpdateUserOnVictory", e);
                    }
                }
            }
            MyCnx.Close();
        }

        // Add one defeat to the specified user
        public void UpdateUserOnDefeat(int iduser)
        {
            MyCnx = new NpgsqlConnection(Conx);
            MyCnx.Open();

            if(MyCnx != null)
            {
                string update = "UPDATE  \"user\"  SET defeat=defeat+1 WHERE iduser=:iduser;";

                MyCmd = new NpgsqlCommand(update, MyCnx);

                if(MyCmd != null)
                {
                    MyCmd.Parameters.Add(new NpgsqlParameter("iduser", NpgsqlDbType.Integer)).Value = iduser;

                    try
                    {
                        MyCmd.ExecuteNonQuery();
                    }
                    catch(Exception e)
                    {
                        log.Error("UpdateUserOnDefeat", e);
                    }
                }
            }
            MyCnx.Close();
        }
    }
}