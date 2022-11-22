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

        // Return a list of all Users.
        public async Task<List<Users>> GetUsers()
        {
            await using (_db)
            {
                var query = from p in _db.Users
                            select p;
                return query.ToList();
            }
            //return await _db.Users.ToListAsync();
        }
    }
}
