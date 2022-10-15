
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SPA_app.API.DTO;
using SPA_app.API.Pagination;
using SPA_app.API.Validators;
using SPA_app.Domain.Entities;
using SPA_app.Domain.Helpers;
using SPA_app.Domain.Interface;
using SPA_app.Domain.Models;
using SPA_app.Domain.Service.Interface;
using System;
using System.Threading.Tasks;

namespace SPA_app.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
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
        public async Task<IActionResult> Get([FromQuery]PageParameters pageParameters)
        {
            var result = await _messageService.GetAllAsync(pageParameters);
            if (result == null)
                return NotFound();

            return Ok(result.ToOut());
        }

        [HttpGet("{id}")]
        [ActionName("id")]
        public async Task<IActionResult> GetByIdAsync(Guid id, [FromQuery] PageParameters pageParameters)
        {
            if (id == Guid.Empty)
                return BadRequest();
            var result = await _messageService.GetByIdAsync(id, pageParameters);
            if (result == null)
                return NotFound();

            return Ok(result.ToOut());
        }

        [HttpPost("add")]
        [ActionName("add")]
        public async Task<IActionResult> AddAsync(MessageOutDto data)
        {
            if (data == null)
                return BadRequest();

            ValidationResult result = await _validator.ValidateAsync(data);

            if (!result.IsValid)
            {
                result.AddToModelState(this.ModelState);
                return new BadRequestObjectResult(ModelState);
            }
            
            var id = await _messageService.AddAsync(data);
            return Created($"{id}", id);
        }
    }
}
