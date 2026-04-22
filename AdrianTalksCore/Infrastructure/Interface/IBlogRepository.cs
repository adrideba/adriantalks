using AdrianTalksCore.Models;

namespace AdrianTalksCore.Infrastructure.Interface
{
    public interface IBlogRepository
    {
        List<Blog> GetBlogs(int take, int category);
        Task<Blog> GetBlog(int blogId);
        List<Blog> GetPopularBlogs(int take, int category);
        List<Blog> GetRandomBlogs(int take, int category, int excludeBlogId);

        Task<bool> IncrementBlogViewCount(int blogId);
    }
}
