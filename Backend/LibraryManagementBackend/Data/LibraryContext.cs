using Microsoft.EntityFrameworkCore;
using LibraryManagementBackend.Models;

namespace LibraryManagementBackend.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
    }
}
