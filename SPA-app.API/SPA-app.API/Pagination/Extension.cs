using SPA_app.API.DTO;
using SPA_app.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPA_app.API.Pagination
{
    public static class Extension
    {
        public static PaginationDTO ToOut(this PagedList<MessageOutDto> pg)
        {
            return new PaginationDTO()
            {
                CurrentPage = pg.Metadata.CurrentPage,
                PageSize = pg.Metadata.PageSize,
                TotalCount = pg.Metadata.TotalCount,
                TotalPages = pg.Metadata.TotalPages,
                HasNext = pg.Metadata.HasNext,
                HasPrevious = pg.Metadata.HasPrevious,
                Result = pg
            };
        }
    }
}
