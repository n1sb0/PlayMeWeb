using System;

using LinqToDB;

using Microsoft.AspNetCore.Mvc;

using playme_api.Helper;
using playme_api.Interfaces;
using playme_api.Models;

namespace playme_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //private readonly IUsersRepository _usersRepository;

        //public UsersController(IUsersRepository usersRepository)
        //{
        //    _usersRepository = usersRepository;
        //}

        private readonly Linq2DbContext _db;
        public UsersController(Linq2DbContext connection)
        {
            _db = connection;
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<User>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                //var users = await _usersRepository.GetUsers();
                
                var users = await _db.Users.ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpGet("GetUser/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _db.Users.FirstOrDefaultAsync(x => x.id == id);
                return user != null ? Ok(user) : NotFound(id) ;

                //var user = await _usersRepository.GetUser(id);
                //return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]    
        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            try
            {
                var userId = await _db.InsertAsync(user);
                return CreatedAtAction((nameof(GetUser)), new { id = userId }, user);

                //int newUserId = await _usersRepository.CreateUser(user);
                //user.id = newUserId;
                //return CreatedAtAction((nameof(GetUser)), new { id = newUserId }, user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(User user)
        {
            try
            {
                var userId = await _db.UpdateAsync(user);
                return CreatedAtAction((nameof(GetUser)), new { id = userId }, user);

                //int newUserId = await _usersRepository.UpdateUser(user);
                //user.id = newUserId;
                //return CreatedAtAction((nameof(GetUser)), new { id = newUserId }, user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(int))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                
                var result = await _db.Users.DeleteAsync(x => x.id == id);
                //return CreatedAtAction((nameof(GetUser)), new {id = userId}, _db.Users.First(x => x.id == userId));
                //_usersRepository.DeleteUserById(id);
                return result == 1 ? Ok() : BadRequest(id);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
