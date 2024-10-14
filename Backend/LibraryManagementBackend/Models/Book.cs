namespace LibraryManagementBackend.Models
{
    public class Book
    {
        public required int Id { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string ISBN { get; set; }
        public required int PublishedYear { get; set; }
    }
}
