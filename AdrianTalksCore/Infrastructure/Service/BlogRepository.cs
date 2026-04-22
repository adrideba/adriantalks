using AdrianTalksCore.Data;
using AdrianTalksCore.Infrastructure.Interface;
using AdrianTalksCore.Models;
using AdrianTalksCore.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace AdrianTalksCore.Infrastructure.Service
{
    public class BlogRepository : IBlogRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMemoryCache _memCache;
        List<Blog> blogs = [];

        public BlogRepository(
            ApplicationDbContext context, IMemoryCache memCache)
        {
            _context = context;
            _memCache = memCache;

            if (!_memCache.TryGetValue(CacheEnums.Blogs, out blogs))
            {
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                        .SetSlidingExpiration(TimeSpan.FromDays(30))
                .SetAbsoluteExpiration(TimeSpan.FromDays(30));

                blogs = _context.Blog
                                .Include(x => x.Category)
                                .Include(x => x.BlogViewCount)
                                .OrderByDescending(x => x.CreatedAt)
                                .ToList();

                _memCache.Set(CacheEnums.Blogs, blogs, cacheEntryOptions);
            }
        }

        public List<Blog> GetBlogs(int take, int category)
        {
            if (category == 0)
                return blogs.Take(take).ToList();

            return blogs
                      .Where(x => x.CategoryId == category)
                      .Take(take).ToList();
        }

        public async Task<Blog> GetBlog(int blogId)
        {
            await IncrementBlogViewCount(blogId);

            return blogs
                      .Where(x => x.Id == blogId)
                      .First();
        }

        public List<Blog> GetPopularBlogs(int take, int category)
        {
            if (category == 0)
            {
                return blogs
                          .OrderByDescending(x => x.BlogViewCount.ViewCount)
                          .Take(take)
                          .ToList();
            }

            return blogs
              .Where(x => x.CategoryId == category)
              .OrderByDescending(x => x.BlogViewCount.ViewCount)
              .Take(take).ToList();
        }

        public List<Blog> GetRandomBlogs(int take, int category, int excludeBlogId)
        {
            if (category == 0)
                return blogs.OrderBy(x => Guid.NewGuid()).Take(take).ToList();

            if (excludeBlogId == 0)
                return blogs
                      .OrderBy(x => Guid.NewGuid())
                      .Where(x => x.CategoryId == category)
                      .Take(take).ToList();

            return blogs
                      .OrderBy(x => Guid.NewGuid())
                      .Where(x => x.CategoryId == category && x.Id != excludeBlogId)
                      .Take(take).ToList();
        }

        public async Task<bool> IncrementBlogViewCount(int blogId)
        {
            try
            {
                BlogViewCount blogViewCount = _context.BlogViewCount.Single(x => x.BlogId == blogId);

                if (blogViewCount != null)
                {
                    blogViewCount.ViewCount++;
                    await _context.SaveChangesAsync();
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
