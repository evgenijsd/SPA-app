using SPA_app.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace SPA_app.Domain.Models
{
    public class PageParameters
    {
        const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }

        public ESortingMessagesType SortingType { get; set; } = ESortingMessagesType.ByDate;
    }

    public static class PageSettings
    {
        public static ESortingMessagesType SortingType { get; set; }

        public static bool Direction { get; set; }

        public static int PageNumber { get; set; } = 1;
    }
}
