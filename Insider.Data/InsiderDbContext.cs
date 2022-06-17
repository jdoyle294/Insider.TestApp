using Microsoft.EntityFrameworkCore;
using Insider.Data.Models;

namespace Insider.Data;

public class InsiderDbContext : DbContext
{
    public DbSet<Article> Articles { get; set; }
    
    public string DbPath { get; }
    
    public InsiderDbContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "insider.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder opts) =>
        opts.UseSqlite($"Data Source={DbPath}");
}