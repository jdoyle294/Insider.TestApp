using System.Net.Mime;
using Insider.Data;
using Microsoft.AspNetCore.Mvc;
using Insider.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Insider.TestApp.Controllers;

[ApiController]
[Route("[controller]")]
public class ArticleController : ControllerBase
{
    private readonly ILogger<ArticleController> _logger;
    private readonly InsiderDbContext _dbContext;

    public ArticleController(ILogger<ArticleController> logger, InsiderDbContext dbContext) =>
        (_logger, _dbContext) =
        (logger, dbContext);

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Article))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        var article = await _dbContext.Articles.FindAsync(id);

        if (article == null)
        {
            return NotFound();
        }

        return Ok(article);
    }

    [HttpGet]
    public async Task<IEnumerable<Article>> GetAllAsync() => await _dbContext.Articles.ToArrayAsync();

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        var article = await _dbContext.Articles.FindAsync(id);

        if (article == null)
        {
            return NoContent();
        }
        
        _dbContext.Remove(article);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Article))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateAsync([FromBody]Article article)
    {
        try
        {
            _dbContext.Articles.Add(article);
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Unable to save article");
            return BadRequest();
        }

        return new ObjectResult(article) { StatusCode = StatusCodes.Status201Created };
    }
    
    [HttpPut]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Article))]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateAsync([FromBody]Article article)
    {
        try
        {
            var dbArticle = await _dbContext.Articles.FindAsync(article.Id);

            if (dbArticle == null)
            {
                return NoContent();
            }

            dbArticle.Author = article.Author;
            dbArticle.Body = article.Body;
            dbArticle.Title = article.Title;
            dbArticle.PublicationDate = article.PublicationDate;
            
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Unable to update article");
            return BadRequest();
        }
        
        return Ok(article);
    }
}