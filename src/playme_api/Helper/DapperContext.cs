using System.Data;
using Microsoft.Data.SqlClient;

namespace playme_api.Helper
{
    public class DapperContext : IDisposable
    {
        //Addded IDisposable for auto Dispose for connection (this for use connection witout using to call evry time CreateConnection)
        //In this case CreateConnection() will be called once and disposed after.
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DapperContext(IConfiguration configuration)
        {
            //Call IConfiguration to extract connection string from AppSettings.
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("SqlConnection");
        }

        //return connection for db
        public IDbConnection CreateConnection() => new SqlConnection(_connectionString);

        //Dispose connectin after nouse
        public void Dispose() { }
    }
}
