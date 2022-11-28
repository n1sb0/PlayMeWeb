namespace playme_api.Interfaces
{
    using playme_api.Models;

    public interface IUsersRepository
    {
        //Return a list of Users
        public Task<List<User>> GetUsers();
        //Return a single User
        public Task<User> GetUser(int id);

        public Task<User> CreateUser(User);
    }
}
