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
        public async Task<Users> GetUser(int id)
        {
            //    //await using (_db)
            //    //{
            //    //    var query = from p in _db.Users
            //    //                where p.id == id
            //    //                select new Users
            //    //                {
            //    //                    id = p.id,
            //    //                    name = p.name,
            //    //                    lastname = p.lastname,
            //    //                    email = p.email,
            //    //                    password = p.password                     
            //    //                };
            //    //    return (Users)query;
            //    //}

            var result = await _db.Users.Where(u => u.id == id).FirstOrDefaultAsync();
            return result ?? new Users();
        }

        // Return a list of all Users.
        public async Task<List<Users>> GetUsers()
        {
            await using (_db)
            {
                var query = from p in _db.Users
                            select p;

                var result = query.ToList();
                return result ?? new List<Users>();
            }

            //return await _db.Users.ToListAsync();
        }
    }
}
