using System.ComponentModel.DataAnnotations;

namespace Insider.Data.Models;

public class Article
{
    [Key]
    public Guid Id { get; set; }

    [MaxLength(50)] public string Title { get; set; } = string.Empty;
    
    [MaxLength(50)] public string Author { get; set; } = string.Empty;
    
    public DateTime? PublicationDate { get; set; }
    
    [MaxLength(1000)] public string? Body { get; set; }
}