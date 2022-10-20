using SPA_app.API.DTO;
using SPA_app.Domain.Entities;
using SPA_app.Domain.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace SPA_app.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IGenericService<User, UserDto> _userService;
        private readonly ILogger<UserController> _logger;

        public UserController(
            IGenericService<User, UserDto> userService,
            ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet("all")]
        [ActionName("all")]
        public async Task<IActionResult> Get()
        {
            var result = await _userService.GetAllAsync();
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpGet("{id}")]
        [ActionName("id")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            if (id == Guid.Empty)
                return BadRequest();
            var result = await _userService.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost("add")]
        [ActionName("add")]
        public async Task<IActionResult> AddAsync(UserDto data)
        {
            if (data == null)
                return BadRequest();
            data.Id = Guid.Empty;
            data.Created = DateTime.Now;
            var result = await _userService.AddAsync(data);
            var id = result.Id;
            return Created($"{id}", id);
        }

        [HttpPut("update")]
        [ActionName("update")]
        public async Task<IActionResult> UpdateAsync(UserDto data)
        {
            if (data == null)
                return BadRequest();
            var result = await _userService.UpdateAsync(data, data.Id);
            if (result == null)
                return NotFound();
            return Accepted(data);
        }

        [HttpDelete("{id}")]
        [ActionName("delete")]
        public async Task<IActionResult> DeleteAync(Guid id)
        {
            if (id == Guid.Empty)
                return BadRequest();
            var result = await _userService.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            await _userService.DeleteAsync(id);
            return NoContent();
        }        
    }
}
