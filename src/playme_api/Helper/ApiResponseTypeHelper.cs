using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

using playme_api.Models;

namespace playme_api.Helper
{

    public static class ApiResponseTypeHelper 
    {
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(FriendShip))]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Any)]
        public static void CreateFriendShip() { }

        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FriendShip))]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Any)]
        public static void FriendShip() { }

        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<FriendShip>))]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Any)]
        public static void ListFriends() { }
    }
}
