namespace playme_api.Interfaces
{
    using playme_api.Models;

    public interface IUsersRepository
    {
        //Return a list of Users
        public Task<List<Users>> GetUsers();
    }
}
