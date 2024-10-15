using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using LibraryManagementBackend.Models;

namespace LibraryManagementBackend.Data
{
    public class LibraryContext : IdentityDbContext<IdentityUser> // inherited from identityDbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
    }
}
