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
        public string? name { get; set; }
        [Column]
        public string? lastname { get; set; }
        [Column]
        public string? email { get; set; }
        [Column]
        public bool? email_verified { get; set; }
        [Column]
        public string? hashed_password { get; set; }
        [Column]
        public string? salt { get; set; }
        [Column]
        public string? image { get; set; }
        [Column]
        public DateTime? created_at { get; set; } = DateTime.UtcNow;
        [Column]
        public DateTime? updated_at { get; set; } = DateTime.UtcNow;
    }
}
