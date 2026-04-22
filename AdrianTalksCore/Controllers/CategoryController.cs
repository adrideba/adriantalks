using Microsoft.AspNetCore.Mvc;
using AdrianTalksCore.Infrastructure.Interface;
using AdrianTalksCore.Models;

namespace AdrianTalksCore.Controllers
{
  public class CategoryController: BaseController
  {
    private readonly ICategoryRepository _categoryRepository;

    public CategoryController(ICategoryRepository categoryRepository)
    {
      _categoryRepository = categoryRepository;
    }

    [HttpGet]
    [Route("getcategory")]
    public async Task<List<Category>> GetCategory()
    {
      return await _categoryRepository.GetCategory();
    }
  }
}
