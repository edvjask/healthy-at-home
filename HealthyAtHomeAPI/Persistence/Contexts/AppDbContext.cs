using HealthyAtHomeAPI.Builders;
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
    public DbSet<ExerciseCue> ExerciseCues { get; set; }
    public DbSet<WorkoutProgram> WorkoutPrograms { get; set; }
    public DbSet<Workout> Workouts { get; set; }
    public DbSet<WorkoutSet> WorkoutSets { get; set; }


    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        var inventoryTypesEnumConverter = new EnumCollectionJsonValueConverter<EInventoryType>();
        var inventoryTypesEnumComparer = new CollectionValueComparer<EInventoryType>();
        var muscleGroupsConverter = new EnumCollectionJsonValueConverter<EMuscleGroup>();
        var muscleGroupComparer = new CollectionValueComparer<EMuscleGroup>();


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
        builder.Entity<TrainingPlanOptions>().Property(tpo => tpo.MuscleGroupsWanted)
            .HasConversion(muscleGroupsConverter)
            .Metadata.SetValueComparer(muscleGroupComparer);


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
        builder.Entity<Exercise>()
            .HasMany(e => e.ExerciseCues)
            .WithOne(e => e.Exercise)
            .HasForeignKey(e => e.ExerciseId);

        builder.Entity<ExerciseCue>().Property(e => e.Id).IsRequired().ValueGeneratedOnAdd();

        var exerciseBuilder = new ExerciseBuilder();
        builder.Entity<Exercise>().HasData(
            new Exercise
            {
                Id = 1,
                Instructions =
                    "Keeping body straight, lower body to floor by bending arms. Push body up until arms are extended. Repeat.",
                Name = "Push Up",
                ExerciseCues = null,
                ExerciseDifficulty = ELevelsOfDifficulty.Novice,
                ExerciseType = EExerciseType.HorizontalPush,
                InventoryTypes = new List<EInventoryType>(),
                MuscleGroups = new List<EMuscleGroup> {EMuscleGroup.Arms, EMuscleGroup.Chest, EMuscleGroup.Shoulders}
            },
            new Exercise
            {
                Id = 2,
                Instructions =
                    "Pull body up until chin is above bar. Lower body until arms and shoulders are fully extended. Repeat.",
                Name = "Pull Up",
                ExerciseDifficulty = ELevelsOfDifficulty.Intermediate,
                ExerciseType = EExerciseType.VerticalPull,
                YoutubeLink = "https://www.youtube.com/embed/eGo4IYlbE5g",
                InventoryTypes = new List<EInventoryType> {EInventoryType.PullupBar},
                MuscleGroups = new List<EMuscleGroup> {EMuscleGroup.Arms, EMuscleGroup.Back},
                HarderVariationId = 11,
                EasierVariationId = 10
            },
            exerciseBuilder
                .Reset()
                .AddId(3)
                .AddInstruction("Lower body by bending arms, allowing elbows to flare out" +
                                " to sides. When slight stretch is felt in chest or shoulders," +
                                " push body up until arms are straight.")
                .AddName("Bodyweight Dip")
                .AddDifficulty(ELevelsOfDifficulty.Intermediate)
                .AddType(EExerciseType.VerticalPush)
                .AddInventoryType(EInventoryType.Chair)
                .AddInventoryType(EInventoryType.Table)
                .AddMuscleGroup(EMuscleGroup.Arms)
                .AddMuscleGroup(EMuscleGroup.Chest)
                .AddMuscleGroup(EMuscleGroup.Shoulders)
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(4)
                .AddInstruction(
                    "Keeping body straight, pull body up to bar. Return until arms are extended and shoulders are stretched forward.")
                .AddName("Bodyweight Row")
                .AddDifficulty(ELevelsOfDifficulty.Novice)
                .AddType(EExerciseType.HorizontalPull)
                .AddInventoryType(EInventoryType.Chair)
                .AddInventoryType(EInventoryType.Table)
                .AddMuscleGroup(EMuscleGroup.Arms)
                .AddMuscleGroup(EMuscleGroup.Back)
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(5)
                .AddInstruction(
                    "Put your hands close together so the thumbs and index fingers touch, then perform a pushup.")
                .AddName("Diamond Pushup")
                .AddDifficulty(ELevelsOfDifficulty.Intermediate)
                .AddType(EExerciseType.HorizontalPush)
                .AddMuscleGroup(EMuscleGroup.Arms)
                .AddMuscleGroup(EMuscleGroup.Chest)
                .AddMuscleGroup(EMuscleGroup.Shoulders)
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(6)
                .AddInstruction(
                    "Put your hands close together so the thumbs and index fingers touch, then perform a pushup.")
                .AddName("Pseudo Planche Pushup")
                .AddDifficulty(ELevelsOfDifficulty.Advanced)
                .AddType(EExerciseType.HorizontalPush)
                .AddMuscleGroup(EMuscleGroup.Arms)
                .AddMuscleGroup(EMuscleGroup.Chest)
                .AddMuscleGroup(EMuscleGroup.Shoulders)
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(7)
                .AddInstruction(
                    "Raise legs by flexing hips and knees until hips are fully flexed. Continue to raise knees toward shoulders by flexing waist. Return until waist, hips, and knees are extended downward.")
                .AddName("Hanging Leg-Hip Raise")
                .AddDifficulty(ELevelsOfDifficulty.Novice)
                .AddType(EExerciseType.Core)
                .AddInventoryType(EInventoryType.PullupBar)
                .AddMuscleGroup(EMuscleGroup.Core)
                .AddYoutubeLink("https://www.youtube.com/embed/QyVq5oUBpss")
                .AddHarderVariationId(8)
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(8)
                .AddInstruction(
                    "Raise legs by flexing hips and knees until hips are fully flexed. Continue to raise knees toward shoulders by flexing waist. Return until waist, hips, and knees are extended downward.")
                .AddName("Straight Leg Hanging Leg-Hip Raise")
                .AddDifficulty(ELevelsOfDifficulty.Intermediate)
                .AddType(EExerciseType.Core)
                .AddInventoryType(EInventoryType.PullupBar)
                .AddMuscleGroup(EMuscleGroup.Core)
                .AddYoutubeLink("https://www.youtube.com/embed/QyVq5oUBpss")
                .AddEasierVariationId(7)
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(9)
                .AddInstruction(
                    "Squat down by bending hips back while allowing knees to bend forward, keeping back straight and knees pointed same direction as feet." +
                    " Descend until thighs are just past parallel to floor." +
                    " Squat up by extending knees and hips until legs are straight. Return and repeat.")
                .AddName("Bodyweight Squat")
                .AddDifficulty(ELevelsOfDifficulty.Novice)
                .AddType(EExerciseType.Legs)
                .AddMuscleGroup(EMuscleGroup.Legs)
                .AddYoutubeLink("https://www.youtube.com/embed/gsNoPYwWXeM")
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(10)
                .AddInstruction(
                    "Jump to the top of the pull-up position, then slowly (as slowly as you can), lower yourself until your arms are straight.")
                .AddName("Pull Up Negatives")
                .AddDifficulty(ELevelsOfDifficulty.Novice)
                .AddType(EExerciseType.VerticalPull)
                .AddMuscleGroup(EMuscleGroup.Back)
                .AddMuscleGroup(EMuscleGroup.Arms)
                .AddInventoryType(EInventoryType.PullupBar)
                .AddInventoryType(EInventoryType.GymnasticRings)
                .AddHarderVariationId(2)
                .AddYoutubeLink("https://www.youtube.com/embed/Y3ntNsIS2Q8")
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(11)
                .AddInstruction(
                    "Hold your legs in an L-sit position, perform a pull-up.")
                .AddName("L-Sit Pull Up")
                .AddDifficulty(ELevelsOfDifficulty.Advanced)
                .AddType(EExerciseType.VerticalPull)
                .AddMuscleGroup(EMuscleGroup.Back)
                .AddMuscleGroup(EMuscleGroup.Arms)
                .AddInventoryType(EInventoryType.PullupBar)
                .AddInventoryType(EInventoryType.GymnasticRings)
                .AddYoutubeLink("https://www.youtube.com/embed/sbIxXuOI8D4")
                .AddEasierVariationId(2)
                .Build()
        );
        builder.Entity<ExerciseCue>().HasData(
            new ExerciseCue
            {
                Id = 1,
                CueType = ECueType.Do,
                ExerciseId = 7,
                Description = "Maintain tension"
            },
            new ExerciseCue
            {
                Id = 2,
                CueType = ECueType.Do,
                ExerciseId = 8,
                Description = "Keep your legs straight"
            },
            new ExerciseCue
            {
                Id = 3,
                CueType = ECueType.Do,
                ExerciseId = 2,
                Description = "Focus on contracting your back"
            },
            new ExerciseCue
            {
                Id = 4,
                CueType = ECueType.Do,
                ExerciseId = 2,
                Description = "Keep a hollow body"
            },
            new ExerciseCue
            {
                Id = 5,
                CueType = ECueType.Dont,
                ExerciseId = 2,
                Description = "Don't use momentum"
            },
            new ExerciseCue
            {
                Id = 6,
                CueType = ECueType.Dont,
                ExerciseId = 2,
                Description = "Keep your arms bent at the bottom"
            }
            
        );

    }
}