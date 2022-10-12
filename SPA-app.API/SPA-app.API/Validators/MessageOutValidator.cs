using FluentValidation;
using SPA_app.API.DTO;
using SPA_app.Domain.Entities;
using SPA_app.Domain.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SPA_app.API.Validators
{
    public class MessageOutValidator : AbstractValidator<MessageOutDto>
    {
        private readonly IGenericService<Message, MessageDto> _messageService;

        public MessageOutValidator(IGenericService<Message, MessageDto> messageService)
        {
            _messageService = messageService;

            RuleFor(x => x.Name)
                .NotEmpty()
                .NotNull()
                .MaximumLength(100);
            RuleFor(x => x.Email)
                .NotEmpty()
                .NotNull()
                .EmailAddress()
                .MaximumLength(100);
            RuleFor(x => x.Text)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Created)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Id)
                .NotNull();
            RuleFor(x => x.MessageId)
                .NotNull()
                .MustAsync(BeUniqueAsync)
                .WithMessage("Not found message");
            RuleFor(x => x.HomePage)
                .Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out _)).When(x => !string.IsNullOrEmpty(x.HomePage))
                .WithMessage("Uri is not a valid");
        }

        private async Task<bool> BeUniqueAsync(Guid Id, CancellationToken token) =>
            await _messageService.GetByValidIdAsync(Id) || Id == Guid.Empty;
    }
}
