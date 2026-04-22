using AdrianTalksCore.Data;
using AdrianTalksCore.Enums;
using AdrianTalksCore.Infrastructure.Interface;
using AdrianTalksCore.Models;
using Microsoft.Extensions.Caching.Memory;

namespace AdrianTalksCore.Infrastructure.Service
{
  public class CategoryRepository : ICategoryRepository
  {
    private readonly ApplicationDbContext _context;
    private readonly IMemoryCache _memCache;
    List<Category> categories = [];

    public CategoryRepository(
        ApplicationDbContext context, IMemoryCache memCache)
    {
      _context = context;
      _memCache = memCache;
    }

    public async Task<List<Category>> GetCategory()
    {
      if (!_memCache.TryGetValue(CacheEnums.Categories, out categories))
      {
        var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromDays(100))
        .SetAbsoluteExpiration(TimeSpan.FromDays(100));

        categories = _context.Category.ToList();

        _memCache.Set(CacheEnums.Categories, categories, cacheEntryOptions);
      }

      return categories;
    }
  }
}
