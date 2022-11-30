namespace playme_api.Interfaces
{
    using playme_api.Models;

    public interface IUsersRepository
    {
        //Return a list of Users
        public Task<List<User>> GetUsers();
        //Return a single User
        public Task<User> GetUser(int id);

        //Create new User
        public Task<int> CreateUser(User user);

        //Update existing User
        public Task<int> UpdateUser(User user);

        //Delete a spesific User
        //public Task<int> DeleteUser(int id);
    }
}
