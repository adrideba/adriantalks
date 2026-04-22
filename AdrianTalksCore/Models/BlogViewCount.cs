using System.ComponentModel.DataAnnotations.Schema;

namespace AdrianTalksCore.Models
{
  public class BlogViewCount
  {
    public int Id { get; set; }
    public required int BlogId { get; set; }
    public int ViewCount { get; set; }
  }
}
