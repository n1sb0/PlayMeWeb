using LinqToDB.Configuration;
using LinqToDB.Data;
using LinqToDB;
using playme_api.Models;

namespace playme_api.Helper
{
    public class AppDataConnection : DataConnection
    {
        public AppDataConnection(LinqToDBConnectionOptions<AppDataConnection> options): base(options)
        {
        }

        public ITable<User> Users => this.GetTable<User>();

    }
}
