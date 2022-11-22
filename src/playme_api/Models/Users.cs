namespace playme_api.Models
{
    using System;
    using LinqToDB.Mapping;


    [Table(Name = "Users")]
    public class Users
    {
        //[Identity]
        //public int id { get; set; }
        [PrimaryKey]
        public string email { get; set; }
        [Column]
        public string password { get; set; }
        public string name { get; set; }
    }
}
