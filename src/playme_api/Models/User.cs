using LinqToDB;
using LinqToDB.Mapping;

namespace playme_api.Models
{
    [Table(Name = "Users")]
    public class User
    {
        [Identity, PrimaryKey]
        public int id { get; set; }
        [Column]
        public string? email { get; set; }
        [Column]
        public string? password { get; set; }
        [Column, NotNull]
        public string? name { get; set; }
        [Column]
        public string? lastname { get; set; }
    }
}
