using System;
using System.Collections.Generic;
using System.Text;

namespace SPA_app.Domain.Enums
{
    public enum ESortingMessagesType
    {
        None,
        ByName,
        ByEmail,
        ByDate        
    }

    public static class Sort
    {
        public static ESortingMessagesType SortingType { get; set; }
    }
}
