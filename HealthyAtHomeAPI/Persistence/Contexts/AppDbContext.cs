using HealthyAtHomeAPI.Converters;
using HealthyAtHomeAPI.Enumerators;
using HealthyAtHomeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HealthyAtHomeAPI.Persistence.Contexts;

public class AppDbContext : DbContext
{
    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<TrainingPlan> TrainingPlans { get; set; }
    public DbSet<TrainingPlanOptions> TrainingPlanOptions { get; set; }


    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        var inventoryTypesEnumConverter = new EnumCollectionJsonValueConverter<EInventoryType>();
        var inventoryTypesEnumComparer = new CollectionValueComparer<EInventoryType>();
        var muscleGroupsConverter = new EnumCollectionJsonValueConverter<EMuscleGroups>();
        var muscleGroupComparer = new CollectionValueComparer<EMuscleGroups>();


        base.OnModelCreating(builder);

        builder.Entity<TrainingPlan>().ToTable("TrainingPlans");
        builder.Entity<TrainingPlan>().HasKey(tp => tp.Id);
        builder.Entity<TrainingPlan>().Property(tp => tp.Id).IsRequired().ValueGeneratedOnAdd();

        builder.Entity<TrainingPlanOptions>().ToTable("TrainingPlanOptions");
        builder.Entity<TrainingPlanOptions>().HasKey(tpo => tpo.Id);
        builder.Entity<TrainingPlanOptions>().Property(tpo => tpo.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<TrainingPlanOptions>()
            .Property(tpo => tpo.InventoryTypes)
            .HasConversion(inventoryTypesEnumConverter)
            .Metadata.SetValueComparer(inventoryTypesEnumComparer);


        builder.Entity<Exercise>().ToTable("Exercises");
        builder.Entity<Exercise>().HasKey(e => e.Id);
        builder.Entity<Exercise>().Property(e => e.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<Exercise>()
            .Property(e => e.InventoryTypes)
            .HasConversion(inventoryTypesEnumConverter)
            .Metadata.SetValueComparer(inventoryTypesEnumComparer);
        builder.Entity<Exercise>()
            .Property(e => e.MuscleGroups)
            .HasConversion(muscleGroupsConverter)
            .Metadata.SetValueComparer(muscleGroupComparer);
    }
}