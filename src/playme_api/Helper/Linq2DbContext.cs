using LinqToDB.Configuration;
using LinqToDB.Data;
using LinqToDB;
using playme_api.Models;

namespace playme_api.Helper
{
    public class Linq2DbContext : DataConnection
    {
        public Linq2DbContext(LinqToDBConnectionOptions<Linq2DbContext> options): base(options)
        {
        }

        public ITable<User> Users => this.GetTable<User>();

    }
}
