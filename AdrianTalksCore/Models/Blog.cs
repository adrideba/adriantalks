using System.ComponentModel.DataAnnotations.Schema;

namespace AdrianTalksCore.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Author { get; set; }
        public required string MainImage { get; set; }
        public required DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        [ForeignKey("Category")]
        public required int CategoryId { get; set; }
        public required Category Category { get; set; }
        public required BlogViewCount BlogViewCount { get; set; }
    }
}
