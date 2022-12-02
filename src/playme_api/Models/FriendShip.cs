using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

using LinqToDB;
using LinqToDB.Mapping;

namespace playme_api.Models
{
    [Table(Name = "FriendShip")]
    public class FriendShip
    {
        [Column, NotNull]
        public int userid { get; set; }
        [Column, NotNull]
        public int friendid { get; set; }
        [Column, NotNull]
        public DateTime created { get; set; } = DateTime.UtcNow;

    }
}
