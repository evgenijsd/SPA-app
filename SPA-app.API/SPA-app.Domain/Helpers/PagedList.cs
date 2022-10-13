using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SPA_app.Domain.Helpers
{
    public class PagedList<T> : List<T>
    {
        public PagedMetadata Metadata { get; set; }

        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            Metadata = new PagedMetadata(count, pageNumber, pageSize);

            AddRange(items);
        }

        public static PagedList<T> ToPagedList(List<T> source, int pageNumber, int pageSize, int count)
        {
            return new PagedList<T>(source, count, pageNumber, pageSize);
        }
    }
}
