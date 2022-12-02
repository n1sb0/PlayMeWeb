using LinqToDB;

using Microsoft.AspNetCore.Mvc;

using playme_api.Helper;
using playme_api.Models;

namespace playme_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendShipController : ControllerBase
    {
        private readonly Linq2DbContext _db;
        public FriendShipController(Linq2DbContext connection)
        {
            _db = connection;
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FriendShip))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPost("CreateFriendShip")]
        public async Task<IActionResult> CreateFriendShip([FromBody] FriendShip friendShip)
        {
            try
            {
                int result = 0;

                if (!await FriendShipExisit(friendShip))
                    result = await _db.InsertAsync(friendShip);

                return result == 1 ? Ok(friendShip) : BadRequest(friendShip);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private async Task<bool> FriendShipExisit(FriendShip friendShip)
        {
            var checkFriendShip1 = await _db.FriendShip.Select(f => f.userid == friendShip.userid && f.friendid == friendShip.friendid).FirstAsync();
            var checkFriendShip2 = await _db.FriendShip.Select(f => f.userid == friendShip.friendid && f.friendid == friendShip.userid).FirstAsync();

            return (checkFriendShip1 || checkFriendShip2);
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<FriendShip>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPost("GetFriends")]
        public async Task<IActionResult> GetFriends([FromBody] int userid)
        {
            try
            {
                var userFriends = await _db.FriendShip.Where(f => f.userid == userid || f.friendid == userid).OrderBy(f => f.created).ToListAsync();

                return userFriends != null ? Ok(userFriends) : BadRequest(userid);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<FriendShip>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpDelete("DeleteFriend")]
        public async Task<IActionResult> DeleteFriend([FromBody] FriendShip friendShip)
        {
            try
            {
                var result = await _db.FriendShip.DeleteAsync(f => (f.userid == friendShip.userid && f.friendid == friendShip.friendid) || (f.friendid == friendShip.userid && f.userid == friendShip.friendid));

                return result == 1 ? Ok(result) : BadRequest(friendShip);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
