using FluentValidation;
using SPA_app.API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPA_app.API.Validators
{
    public class MessageOutValidator : AbstractValidator<MessageOutDto>
    {
        public MessageOutValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .NotNull()
                .MaximumLength(100);
            RuleFor(x => x.Email)
                .NotEmpty()
                .NotNull()
                .MaximumLength(100);
            RuleFor(x => x.Text)
                .NotNull()
                .NotEmpty();
        }
    }
}
