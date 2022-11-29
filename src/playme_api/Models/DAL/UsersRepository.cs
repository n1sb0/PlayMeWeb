namespace playme_api.Models.DAL
{
    using playme_api.Helper;
    using playme_api.Interfaces;
    using LinqToDB;
    using LinqToDB.Common;

    using System.Data;

    public class UsersRepository : IUsersRepository
    {
        private readonly AppDataConnection _db;

        public UsersRepository(AppDataConnection connection)
        {
            _db = connection;
        }

        //// Return a single User.
        public async Task<User> GetUser(int id)
        {
            //await using (_db)
            //{
            //    var query = from p in _db.users
            //                where p.id == id
            //                select new users
            //                {
            //                    id = p.id,
            //                    name = p.name,
            //                    lastname = p.lastname,
            //                    email = p.email,
            //                    password = p.password
            //                };
            //    return (users)query;
            //}

            var result = await _db.Users.Where(u => u.id == id).FirstOrDefaultAsync();
            return result ?? new User();
        }

        // Return a list of all Users.
        public async Task<List<User>> GetUsers()
        {
            await using (_db)
            {
                var query = from p in _db.Users
                            select p;

                var result = query.ToList();
                return result ?? new List<User>();
            }

            //return await _db.Users.ToListAsync();
        }

        public async Task<int> CreateUser(User user)
        {
            await using (_db)
            {
               var result = _db.Insert(user);
               return result;
            }
        }

        public async Task<int> UpdateUser(User user)
        {
            await using (_db)
            {
                var result = _db.Update(user);
                return result;
            }
        }

        //public async void DeleteUser(int id)
        //{
        //    throw new NotImplementedException();
        //}


    }
}
