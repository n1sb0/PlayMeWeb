using  LinqToDB;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

using playme_api.Helper;
using playme_api.Models;

namespace playme_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiConventionType(typeof(ApiResponseTypeHelper))]
    public class FriendShipController : ControllerBase
    {
        private readonly Linq2DbContext _db;
        public FriendShipController(Linq2DbContext connection)
        {
            _db = connection;
        }

        [ApiConventionMethod(typeof(ApiResponseTypeHelper), nameof(ApiResponseTypeHelper.CreateFriendShip))]
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

        [ApiConventionMethod(typeof(ApiResponseTypeHelper), nameof(ApiResponseTypeHelper.ListFriends))]
        [HttpGet("GetFriends/{userid}")]
        public async Task<IActionResult> GetFriends(int userid)
        {
            try
            {
                var userFriends = await (from p in _db.FriendShip.Where(f => f.userid == userid || f.friendid == userid)
                                         from c in _db.Users.Where(q => q.id == ((p.userid != userid) ? p.userid : p.friendid))
                                   select c).ToListAsync();
                //var userFriends = await _db.FriendShip.Where(f => f.userid == userid || f.friendid == userid).OrderBy(f => f.created).ToListAsync();

                return userFriends != null ? Ok(userFriends) : BadRequest(userid);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FriendShip))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpDelete("DeleteFriendShip")]
        public async Task<IActionResult> DeleteFriendShip([FromBody] FriendShip friendShip)
        {
            try
            {
                var result = await _db.FriendShip.DeleteAsync(f => (f.userid == friendShip.userid && f.friendid == friendShip.friendid) || (f.friendid == friendShip.userid && f.userid == friendShip.friendid));

                return result == 1 ? Ok(friendShip) : BadRequest(friendShip);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
