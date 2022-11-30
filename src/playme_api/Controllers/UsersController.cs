﻿using System;

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

        private readonly IUsersRepository _usersRepository;

        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
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
            try
            {
                var users = await _usersRepository.GetUsers();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _usersRepository.GetUser(id);

                return (user is null || user.id == 0) ? NotFound() : Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
