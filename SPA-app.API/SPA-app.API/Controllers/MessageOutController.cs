
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SPA_app.API.DTO;
using SPA_app.API.Validators;
using SPA_app.Domain.Entities;
using SPA_app.Domain.Interface;
using SPA_app.Domain.Service.Interface;
using System;
using System.Threading.Tasks;

namespace SPA_app.API.Controllers
{
    public class MessageOutController : Controller
    {
        private IValidator<MessageOutDto> _validator;
        private readonly IMessageOutService<MessageOutDto> _messageService;
        private readonly IGenericService<User, UserDto> _userService;
        private readonly ILogger<MessageOutController> _logger;

        public MessageOutController(
            IMessageOutService<MessageOutDto> messageService,
            IGenericService<User, UserDto> userService,
            IValidator<MessageOutDto> validator,
            ILogger<MessageOutController> logger)
        {
            _messageService = messageService;
            _userService = userService;
            _validator = validator;
            _logger = logger;
        }

        [HttpGet("all")]
        [ActionName("all")]
        public async Task<IActionResult> Get()
        {
            var result = await _messageService.GetAllAsync();
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost("add")]
        [ActionName("add")]
        public async Task<IActionResult> AddAsync(MessageOutDto data)
        {
            if (data == null)
                return BadRequest();

            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            data.Id = Guid.Empty;
            data.Created = DateTime.Now;
            var id = await _messageService.AddAsync(data);
            return Created($"{id}", id);
        }
    }
}
