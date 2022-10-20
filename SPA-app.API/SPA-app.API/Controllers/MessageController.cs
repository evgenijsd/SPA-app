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
    public class MessageController : ControllerBase
    {
        private readonly IGenericService<Message, MessageDto> _messageService;
        private readonly ILogger<MessageController> _logger;

        public MessageController(
            IGenericService<Message, MessageDto> messageService,
            ILogger<MessageController> logger)
        {
            _messageService = messageService;
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

        [HttpGet("{id}")]
        [ActionName("id")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            if (id == Guid.Empty)
                return BadRequest();
            var result = await _messageService.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost("add")]
        [ActionName("add")]
        public async Task<IActionResult> AddAsync(MessageDto data)
        {
            if (data == null)
                return BadRequest();
            data.Id = Guid.Empty;
            data.Created = DateTime.Now;
            data.MessageId = Guid.Empty;
            var result = await _messageService.AddAsync(data);
            var id = result.Id;
            return Created($"{id}", id);
        }

        [HttpPut("update")]
        [ActionName("update")]
        public async Task<IActionResult> UpdateAsync(MessageDto data)
        {
            if (data == null)
                return BadRequest();
            var result = await _messageService.UpdateAsync(data, data.Id);
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
            var result = await _messageService.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            await _messageService.DeleteAsync(id);
            return NoContent();
        }        
    }
}
