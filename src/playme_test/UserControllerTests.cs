using Microsoft.AspNetCore.Mvc;
using System;
using Moq;
using Xunit;

using playme_api.Controllers;
using playme_api.Interfaces;
using playme_api.Models;

namespace playme_test;

public class UserControllerTests
{
    private readonly Mock<IUsersRepository> _userRepositoryStub = new();
    private readonly IUsersRepository _userRepositoryFake;

    //Naming: UnitOfWork_StateUnderTest_ExpectedBehavior
    [Fact]
    public async Task GetUser_WithUnexistingUser_ReturnNotFound()
    {
        //Arange
        _userRepositoryStub.Setup(repo => repo.GetUser(It.IsAny<int>())).ReturnsAsync((User)null);

        var userController = new UsersController(_userRepositoryStub.Object);

        //Act
        var result = await userController.GetUser(new Random().Next());

        //Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task GetUser_WithExistingUser_ReturnExpectedUser()
    {
        //Arange
        var expetedUser = CreateRandomUser();
        //_userRepositoryStub.Setup(repo => repo.GetUser(It.IsAny<int>())).ReturnsAsync(expetedUser);
        _userRepositoryStub.Setup(repo => repo.GetUser(It.IsAny<int>())).ReturnsAsync(expetedUser);

        //var userController = new UsersController(_userRepositoryStub.Object);

        //Act
        //var result = await userController.GetUser(new Random().Next());
        var result = await _userRepositoryStub.Object.GetUser(new Random().Next());

        //Assert
        Assert.Same(expetedUser, result);
    }

    private User CreateRandomUser()
    {
        return new()
        {
            id = new Random().Next(),
            name = Guid.NewGuid().ToString(),
            email = Guid.NewGuid().ToString(),
            lastname = Guid.NewGuid().ToString(),
            password = Guid.NewGuid().ToString()
        };
    }
}