using System;
using System.ComponentModel;

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

        //[Association(ThisKey = nameof(FriendShip.friendid), OtherKey = nameof(User.id))]
        //public User? friend { get; set; }

    }
}
