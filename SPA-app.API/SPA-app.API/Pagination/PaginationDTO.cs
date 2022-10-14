using SPA_app.API.DTO;
using System.Collections.Generic;

namespace SPA_app.API.Pagination
{
    public class PaginationDTO
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        public bool HasPrevious { get; set; }
        public bool HasNext { get; set; }

        public List<MessageOutDto> Result { get; set; }
    }
}
