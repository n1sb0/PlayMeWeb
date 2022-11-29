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
        private readonly AppDataConnection _db;
        private readonly IUsersRepository _usersRepository;

        //public UsersController(IUsersRepository usersRepository)
        //{
        //    _usersRepository = usersRepository;
        //}

        public UsersController(AppDataConnection connection)
        {
            _db = connection;
        }


        //private readonly AppDataConnection _connection;

        //public UsersController(AppDataConnection connection)
        //{
        //    _connection = connection;
        //}

        //[HttpGet("ListPeople")]
        //public Task<Users[]> ListPeople()
        //{
        //    var list = _connection.Users.ToArrayAsync();
        //    return list;
        //}

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {

            //await using (_db)
            //{
            //    var query = from p in _db.Users
            //                select p;

            //    var result = query.ToList();
            //    return result ?? new List<User>();
            //}
           
            return Ok(await _db.Users.ToListAsync());
            //try
            //{
            //    var users = await _usersRepository.GetUsers();
            //    return Ok(users);
            //}
            //catch (Exception ex)
            //{
            //    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            //}
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
                return CreatedAtAction((nameof(GetUser)), _db.Users.First(x => x.id == userId));

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
                int newUserId = await _usersRepository.UpdateUser(user);
                user.id = newUserId;
                return CreatedAtAction((nameof(GetUser)), new { id = newUserId }, user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        //[HttpDelete("DeleteUserById/{id}")]
        //public async Task<IActionResult> DeleteUser(int id)
        //{
        //    try
        //    {
        //        _usersRepository.DeleteUserById(id);
        //        return $"User with ID: {id} has been Deleted.";
        //    }
        //    catch (Exception ex)
        //    {
        //        return $"Cann't find User with id: {id}. Exception: {ex}";
        //    }
        //}


    }
}
