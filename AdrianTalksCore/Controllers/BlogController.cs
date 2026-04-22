using Microsoft.AspNetCore.Mvc;
using AdrianTalksCore.Infrastructure.Interface;
using AdrianTalksCore.Models;
using Microsoft.Extensions.Caching.Memory;

namespace AdrianTalksCore.Controllers
{
    public class BlogController : BaseController
    {
        private readonly IBlogRepository _blogRepository;

        public BlogController(IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        [HttpGet]
        [Route("getblogs")]
        public List<Blog> GetBlogs(int take, int category)
        {
            return _blogRepository.GetBlogs(take, category);
        }

        [HttpGet]
        [Route("getblog")]
        public async Task<Blog> GetBlog(int blogId)
        {
            return await _blogRepository.GetBlog(blogId);
        }

        [HttpGet]
        [Route("getpopularblogs")]
        public List<Blog> GetPopularBlogs(int take, int category)
        {
            return _blogRepository.GetPopularBlogs(take, category);
        }

        [HttpGet]
        [Route("getrandomblogs")]
        public List<Blog> GetRandomBlogs(int take, int category, int excludeBlogId)
        {
            return _blogRepository.GetRandomBlogs(take, category, excludeBlogId);
        }
    }
}
