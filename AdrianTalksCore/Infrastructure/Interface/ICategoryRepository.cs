using AdrianTalksCore.Models;

namespace AdrianTalksCore.Infrastructure.Interface
{
  public interface ICategoryRepository
  {
    Task<List<Category>> GetCategory();
  }
}
