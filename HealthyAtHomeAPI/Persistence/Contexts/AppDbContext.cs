using HealthyAtHomeAPI.Builders;
using HealthyAtHomeAPI.Converters;
using HealthyAtHomeAPI.Enumerators;
using HealthyAtHomeAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace HealthyAtHomeAPI.Persistence.Contexts;

public class AppDbContext : DbContext
{
    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<TrainingPlan> TrainingPlans { get; set; }
    public DbSet<TrainingPlanOptions?> TrainingPlanOptions { get; set; }
    public DbSet<ExerciseCue> ExerciseCues { get; set; }
    public DbSet<WorkoutProgram> WorkoutPrograms { get; set; }
    public DbSet<Workout> Workouts { get; set; }
    public DbSet<WorkoutSet> WorkoutSets { get; set; }


    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.ContextInitialized));
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
                ExerciseDifficulty = ELevelsOfDifficulty.Novice,
                ExerciseType = EExerciseType.HorizontalPush,
                InventoryTypes = new List<EInventoryType>(),
                MuscleGroups = new List<EMuscleGroup> {EMuscleGroup.Arms, EMuscleGroup.Chest, EMuscleGroup.Shoulders},
                YoutubeLink = "https://www.youtube.com/embed/IODxDxX7oi4",
                HarderVariationId = 5
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
                .AddYoutubeLink("https://www.youtube.com/embed/2z8JmcrW-As")
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
                .AddYoutubeLink("https://www.youtube.com/embed/PGcTxvw6")
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
                .AddYoutubeLink("https://www.youtube.com/embed/8_ILkbB9an8")
                .AddEasierVariationId(1)
                .AddHarderVariationId(6)
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(6)
                .AddInstruction(
                    "Putting your hands sideways, lean forward with a straight body until your shoulders are in front of your hands. Perform a pushup while maintaining forward lean.")
                .AddName("Pseudo Planche Pushup")
                .AddDifficulty(ELevelsOfDifficulty.Advanced)
                .AddType(EExerciseType.HorizontalPush)
                .AddMuscleGroup(EMuscleGroup.Arms)
                .AddMuscleGroup(EMuscleGroup.Chest)
                .AddMuscleGroup(EMuscleGroup.Shoulders)
                .AddYoutubeLink("https://www.youtube.com/embed/TZ63httkob4")
                .AddEasierVariationId(5)
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
                .AddInstruction("Hang from a bar. With the legs straight, raise your legs as high as you can.")
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
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(12)
                .AddInstruction(
                    "Starting from a plank position with the rings turned out, perform a pushup while keeping the rings turned out.")
                .AddName("RTO Pushup")
                .AddDifficulty(ELevelsOfDifficulty.Advanced)
                .AddType(EExerciseType.HorizontalPush)
                .AddMuscleGroup(EMuscleGroup.Chest)
                .AddMuscleGroup(EMuscleGroup.Arms)
                .AddMuscleGroup(EMuscleGroup.Shoulders)
                .AddInventoryType(EInventoryType.GymnasticRings)
                .AddYoutubeLink("https://www.youtube.com/embed/DxAJ3D9JhQs")
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(13)
                .AddInstruction(
                    "Just like the regular pullup but with weights! Pull body up until chin is above bar. Lower body until arms and shoulders are fully extended. Repeat.")
                .AddName("Weighed Pullups")
                .AddDifficulty(ELevelsOfDifficulty.Intermediate)
                .AddType(EExerciseType.VerticalPull)
                .AddMuscleGroup(EMuscleGroup.Back)
                .AddMuscleGroup(EMuscleGroup.Arms)
                .AddInventoryType(EInventoryType.GymnasticRings)
                .AddInventoryType(EInventoryType.PullupBar)
                .AddInventoryType(EInventoryType.Backpack)
                .AddYoutubeLink("https://www.youtube.com/embed/cidxKb3nnWA")
                .AddEasierVariationId(2)
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(14)
                .AddInstruction(
                    "Lunge forward with first leg. Land on heel, then forefoot." +
                    " Lower body by flexing knee and hip of front leg until knee of rear leg is almost in contact with floor." +
                    " Return to original standing position by forcibly extending hip and knee of forward leg. Repeat by alternating lunge with opposite leg.")
                .AddName("Dumbbell Lunge")
                .AddDifficulty(ELevelsOfDifficulty.Novice)
                .AddType(EExerciseType.Legs)
                .AddMuscleGroup(EMuscleGroup.Legs)
                .AddInventoryType(EInventoryType.Dumbbell)
                .AddYoutubeLink("https://www.youtube.com/embed/D7KaRcUTQeE")
                .Build(),
            exerciseBuilder
                .Reset()
                .AddId(15)
                .AddInstruction(
                    "Extend your elbows out at shoulder level, engage your core, and crunch down toward your hips while contracting your abs.")
                .AddName("Kneeling crunch")
                .AddDifficulty(ELevelsOfDifficulty.Novice)
                .AddType(EExerciseType.Core)
                .AddMuscleGroup(EMuscleGroup.Core)
                .AddInventoryType(EInventoryType.ResistanceBand)
                .AddYoutubeLink("https://www.youtube.com/embed/AV5PmZJIrrw")
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
                Id = 238,
                CueType = ECueType.Dont,
                ExerciseId = 7,
                Description = "Use momentum"
            },
            new ExerciseCue
            {
                Id = 555,
                CueType = ECueType.Do,
                ExerciseId = 1,
                Description = "Keep a hollow body"
            },
            new ExerciseCue
            {
                Id = 556,
                CueType = ECueType.Dont,
                ExerciseId = 1,
                Description = "Arch your lower back"
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
                Id = 302,
                CueType = ECueType.Do,
                ExerciseId = 8,
                Description = "Use momentum"
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
            },
            new ExerciseCue
            {
                Id = 57,
                CueType = ECueType.Do,
                ExerciseId = 3,
                Description = "90 degrees between elbow and arms"
            },
            new ExerciseCue
            {
                Id = 58,
                CueType = ECueType.Dont,
                ExerciseId = 3,
                Description = "Use momentum at the bottom"
            },
            new ExerciseCue
            {
                Id = 59,
                CueType = ECueType.Do,
                ExerciseId = 4,
                Description = "Focus on contracting your back"
            },
            new ExerciseCue
            {
                Id = 60,
                CueType = ECueType.Dont,
                ExerciseId = 4,
                Description = "Lose tension in the core"
            },
            new ExerciseCue
            {
                Id = 61,
                CueType = ECueType.Do,
                ExerciseId = 5,
                Description = "Keep your hands close together"
            },
            new ExerciseCue
            {
                Id = 62,
                CueType = ECueType.Dont,
                ExerciseId = 5,
                Description = "Arch your lower back"
            },
            new ExerciseCue
            {
                Id = 63,
                CueType = ECueType.Do,
                ExerciseId = 6,
                Description = "Maintain hollow body"
            },
            new ExerciseCue
            {
                Id = 64,
                CueType = ECueType.Dont,
                ExerciseId = 6,
                Description = "Lean back going up"
            },
            new ExerciseCue
            {
                Id = 65,
                CueType = ECueType.Do,
                ExerciseId = 9,
                Description = "At least 90 degrees down"
            },
            new ExerciseCue
            {
                Id = 66,
                CueType = ECueType.Dont,
                ExerciseId = 9,
                Description = "Lift your heels"
            },
            new ExerciseCue
            {
                Id = 67,
                CueType = ECueType.Do,
                ExerciseId = 10,
                Description = "Go down as slow as you can"
            },
            new ExerciseCue
            {
                Id = 68,
                CueType = ECueType.Dont,
                ExerciseId = 10,
                Description = "Lose tension in your back"
            },
            new ExerciseCue
            {
                Id = 69,
                CueType = ECueType.Do,
                ExerciseId = 11,
                Description = "Legs straight"
            },
            new ExerciseCue
            {
                Id = 70,
                CueType = ECueType.Dont,
                ExerciseId = 11,
                Description = "Use momentum"
            }
            ,
            new ExerciseCue
            {
                Id = 71,
                CueType = ECueType.Do,
                ExerciseId = 12,
                Description = "Keep rings turned 45 or 90 degrees turned out"
            },
            new ExerciseCue
            {
                Id = 72,
                CueType = ECueType.Dont,
                ExerciseId = 12,
                Description = "Shrug your shoulders"
            },
            new ExerciseCue
            {
                Id = 73,
                CueType = ECueType.Do,
                ExerciseId = 13,
                Description = "At least chin passes the bar at the top"
            },
            new ExerciseCue
            {
                Id = 74,
                CueType = ECueType.Dont,
                ExerciseId = 13,
                Description = "Use momentum"
            },
            new ExerciseCue
            {
                Id = 75,
                CueType = ECueType.Do,
                ExerciseId = 14,
                Description = "Control your movement on the descent"
            },
            new ExerciseCue
            {
                Id = 76,
                CueType = ECueType.Dont,
                ExerciseId = 14,
                Description = "Use a weight that's too heavy"
            }
            ,
            new ExerciseCue
            {
                Id = 77,
                CueType = ECueType.Do,
                ExerciseId = 15,
                Description = "Keep the tension in your core"
            },
            new ExerciseCue
            {
                Id = 78,
                CueType = ECueType.Dont,
                ExerciseId = 15,
                Description = "Try to touch the floor"
            }
            
        );

    }
}