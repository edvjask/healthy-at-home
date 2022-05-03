﻿// <auto-generated />
using System;
using HealthyAtHomeAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HealthyAtHomeAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("ExerciseTrainingPlan", b =>
                {
                    b.Property<int>("ExercisesId")
                        .HasColumnType("int");

                    b.Property<int>("TrainingPlansId")
                        .HasColumnType("int");

                    b.HasKey("ExercisesId", "TrainingPlansId");

                    b.HasIndex("TrainingPlansId");

                    b.ToTable("ExerciseTrainingPlan");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.Exercise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("EasierVariationId")
                        .HasColumnType("int");

                    b.Property<byte>("ExerciseDifficulty")
                        .HasColumnType("tinyint");

                    b.Property<byte>("ExerciseType")
                        .HasColumnType("tinyint");

                    b.Property<int?>("HarderVariationId")
                        .HasColumnType("int");

                    b.Property<string>("Instructions")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("InventoryTypes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MuscleGroups")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("YoutubeLink")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Exercises", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ExerciseDifficulty = (byte)1,
                            ExerciseType = (byte)1,
                            HarderVariationId = 5,
                            Instructions = "Keeping body straight, lower body to floor by bending arms. Push body up until arms are extended. Repeat.",
                            InventoryTypes = "[]",
                            MuscleGroups = "[\"Arms\",\"Chest\",\"Shoulders\"]",
                            Name = "Push Up",
                            YoutubeLink = "https://www.youtube.com/embed/IODxDxX7oi4"
                        },
                        new
                        {
                            Id = 2,
                            EasierVariationId = 10,
                            ExerciseDifficulty = (byte)2,
                            ExerciseType = (byte)4,
                            HarderVariationId = 11,
                            Instructions = "Pull body up until chin is above bar. Lower body until arms and shoulders are fully extended. Repeat.",
                            InventoryTypes = "[\"PullupBar\"]",
                            MuscleGroups = "[\"Arms\",\"Back\"]",
                            Name = "Pull Up",
                            YoutubeLink = "https://www.youtube.com/embed/eGo4IYlbE5g"
                        },
                        new
                        {
                            Id = 3,
                            ExerciseDifficulty = (byte)2,
                            ExerciseType = (byte)3,
                            Instructions = "Lower body by bending arms, allowing elbows to flare out to sides. When slight stretch is felt in chest or shoulders, push body up until arms are straight.",
                            InventoryTypes = "[\"Chair\",\"Table\"]",
                            MuscleGroups = "[\"Arms\",\"Chest\",\"Shoulders\"]",
                            Name = "Bodyweight Dip",
                            YoutubeLink = "https://www.youtube.com/embed/2z8JmcrW-As"
                        },
                        new
                        {
                            Id = 4,
                            ExerciseDifficulty = (byte)1,
                            ExerciseType = (byte)2,
                            Instructions = "Keeping body straight, pull body up to bar. Return until arms are extended and shoulders are stretched forward.",
                            InventoryTypes = "[\"Chair\",\"Table\"]",
                            MuscleGroups = "[\"Arms\",\"Back\"]",
                            Name = "Bodyweight Row",
                            YoutubeLink = "https://www.youtube.com/embed/PGcTxvw6"
                        },
                        new
                        {
                            Id = 5,
                            EasierVariationId = 1,
                            ExerciseDifficulty = (byte)2,
                            ExerciseType = (byte)1,
                            HarderVariationId = 6,
                            Instructions = "Put your hands close together so the thumbs and index fingers touch, then perform a pushup.",
                            InventoryTypes = "[]",
                            MuscleGroups = "[\"Arms\",\"Chest\",\"Shoulders\"]",
                            Name = "Diamond Pushup",
                            YoutubeLink = "https://www.youtube.com/embed/8_ILkbB9an8"
                        },
                        new
                        {
                            Id = 6,
                            EasierVariationId = 5,
                            ExerciseDifficulty = (byte)3,
                            ExerciseType = (byte)1,
                            Instructions = "Putting your hands sideways, lean forward with a straight body until your shoulders are in front of your hands. Perform a pushup while maintaining forward lean.",
                            InventoryTypes = "[]",
                            MuscleGroups = "[\"Arms\",\"Chest\",\"Shoulders\"]",
                            Name = "Pseudo Planche Pushup",
                            YoutubeLink = "https://www.youtube.com/embed/TZ63httkob4"
                        },
                        new
                        {
                            Id = 7,
                            ExerciseDifficulty = (byte)1,
                            ExerciseType = (byte)5,
                            HarderVariationId = 8,
                            Instructions = "Raise legs by flexing hips and knees until hips are fully flexed. Continue to raise knees toward shoulders by flexing waist. Return until waist, hips, and knees are extended downward.",
                            InventoryTypes = "[\"PullupBar\"]",
                            MuscleGroups = "[\"Core\"]",
                            Name = "Hanging Leg-Hip Raise",
                            YoutubeLink = "https://www.youtube.com/embed/QyVq5oUBpss"
                        },
                        new
                        {
                            Id = 8,
                            EasierVariationId = 7,
                            ExerciseDifficulty = (byte)2,
                            ExerciseType = (byte)5,
                            Instructions = "Hang from a bar. With the legs straight, raise your legs as high as you can.",
                            InventoryTypes = "[\"PullupBar\"]",
                            MuscleGroups = "[\"Core\"]",
                            Name = "Straight Leg Hanging Leg-Hip Raise",
                            YoutubeLink = "https://www.youtube.com/embed/QyVq5oUBpss"
                        },
                        new
                        {
                            Id = 9,
                            ExerciseDifficulty = (byte)1,
                            ExerciseType = (byte)6,
                            Instructions = "Squat down by bending hips back while allowing knees to bend forward, keeping back straight and knees pointed same direction as feet. Descend until thighs are just past parallel to floor. Squat up by extending knees and hips until legs are straight. Return and repeat.",
                            InventoryTypes = "[]",
                            MuscleGroups = "[\"Legs\"]",
                            Name = "Bodyweight Squat",
                            YoutubeLink = "https://www.youtube.com/embed/gsNoPYwWXeM"
                        },
                        new
                        {
                            Id = 10,
                            ExerciseDifficulty = (byte)1,
                            ExerciseType = (byte)4,
                            HarderVariationId = 2,
                            Instructions = "Jump to the top of the pull-up position, then slowly (as slowly as you can), lower yourself until your arms are straight.",
                            InventoryTypes = "[\"PullupBar\",\"GymnasticRings\"]",
                            MuscleGroups = "[\"Back\",\"Arms\"]",
                            Name = "Pull Up Negatives",
                            YoutubeLink = "https://www.youtube.com/embed/Y3ntNsIS2Q8"
                        },
                        new
                        {
                            Id = 11,
                            EasierVariationId = 2,
                            ExerciseDifficulty = (byte)3,
                            ExerciseType = (byte)4,
                            Instructions = "Hold your legs in an L-sit position, perform a pull-up.",
                            InventoryTypes = "[\"PullupBar\",\"GymnasticRings\"]",
                            MuscleGroups = "[\"Back\",\"Arms\"]",
                            Name = "L-Sit Pull Up",
                            YoutubeLink = "https://www.youtube.com/embed/sbIxXuOI8D4"
                        },
                        new
                        {
                            Id = 12,
                            ExerciseDifficulty = (byte)3,
                            ExerciseType = (byte)1,
                            Instructions = "Starting from a plank position with the rings turned out, perform a pushup while keeping the rings turned out.",
                            InventoryTypes = "[\"GymnasticRings\"]",
                            MuscleGroups = "[\"Chest\",\"Arms\",\"Shoulders\"]",
                            Name = "RTO Pushup",
                            YoutubeLink = "https://www.youtube.com/embed/DxAJ3D9JhQs"
                        },
                        new
                        {
                            Id = 13,
                            EasierVariationId = 2,
                            ExerciseDifficulty = (byte)2,
                            ExerciseType = (byte)4,
                            Instructions = "Just like the regular pullup but with weights! Pull body up until chin is above bar. Lower body until arms and shoulders are fully extended. Repeat.",
                            InventoryTypes = "[\"GymnasticRings\",\"PullupBar\",\"Backpack\"]",
                            MuscleGroups = "[\"Back\",\"Arms\"]",
                            Name = "Weighed Pullups",
                            YoutubeLink = "https://www.youtube.com/embed/cidxKb3nnWA"
                        },
                        new
                        {
                            Id = 14,
                            ExerciseDifficulty = (byte)1,
                            ExerciseType = (byte)6,
                            Instructions = "Lunge forward with first leg. Land on heel, then forefoot. Lower body by flexing knee and hip of front leg until knee of rear leg is almost in contact with floor. Return to original standing position by forcibly extending hip and knee of forward leg. Repeat by alternating lunge with opposite leg.",
                            InventoryTypes = "[\"Dumbbell\"]",
                            MuscleGroups = "[\"Legs\"]",
                            Name = "Dumbbell Lunge",
                            YoutubeLink = "https://www.youtube.com/embed/D7KaRcUTQeE"
                        },
                        new
                        {
                            Id = 15,
                            ExerciseDifficulty = (byte)1,
                            ExerciseType = (byte)5,
                            Instructions = "Extend your elbows out at shoulder level, engage your core, and crunch down toward your hips while contracting your abs.",
                            InventoryTypes = "[\"ResistanceBand\"]",
                            MuscleGroups = "[\"Core\"]",
                            Name = "Kneeling crunch",
                            YoutubeLink = "https://www.youtube.com/embed/AV5PmZJIrrw"
                        });
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.ExerciseCue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("CueType")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ExerciseId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseId");

                    b.ToTable("ExerciseCues");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CueType = 1,
                            Description = "Maintain tension",
                            ExerciseId = 7
                        },
                        new
                        {
                            Id = 238,
                            CueType = 2,
                            Description = "Use momentum",
                            ExerciseId = 7
                        },
                        new
                        {
                            Id = 555,
                            CueType = 2,
                            Description = "Keep a hollow body",
                            ExerciseId = 1
                        },
                        new
                        {
                            Id = 556,
                            CueType = 1,
                            Description = "Arch your lower back",
                            ExerciseId = 1
                        },
                        new
                        {
                            Id = 2,
                            CueType = 1,
                            Description = "Keep your legs straight",
                            ExerciseId = 8
                        },
                        new
                        {
                            Id = 302,
                            CueType = 1,
                            Description = "Use momentum",
                            ExerciseId = 8
                        },
                        new
                        {
                            Id = 3,
                            CueType = 1,
                            Description = "Focus on contracting your back",
                            ExerciseId = 2
                        },
                        new
                        {
                            Id = 4,
                            CueType = 1,
                            Description = "Keep a hollow body",
                            ExerciseId = 2
                        },
                        new
                        {
                            Id = 5,
                            CueType = 2,
                            Description = "Don't use momentum",
                            ExerciseId = 2
                        },
                        new
                        {
                            Id = 6,
                            CueType = 2,
                            Description = "Keep your arms bent at the bottom",
                            ExerciseId = 2
                        },
                        new
                        {
                            Id = 57,
                            CueType = 1,
                            Description = "90 degrees between elbow and arms",
                            ExerciseId = 3
                        },
                        new
                        {
                            Id = 58,
                            CueType = 2,
                            Description = "Use momentum at the bottom",
                            ExerciseId = 3
                        },
                        new
                        {
                            Id = 59,
                            CueType = 1,
                            Description = "Focus on contracting your back",
                            ExerciseId = 4
                        },
                        new
                        {
                            Id = 60,
                            CueType = 2,
                            Description = "Lose tension in the core",
                            ExerciseId = 4
                        },
                        new
                        {
                            Id = 61,
                            CueType = 1,
                            Description = "Keep your hands close together",
                            ExerciseId = 5
                        },
                        new
                        {
                            Id = 62,
                            CueType = 2,
                            Description = "Arch your lower back",
                            ExerciseId = 5
                        },
                        new
                        {
                            Id = 63,
                            CueType = 1,
                            Description = "Maintain hollow body",
                            ExerciseId = 6
                        },
                        new
                        {
                            Id = 64,
                            CueType = 2,
                            Description = "Lean back going up",
                            ExerciseId = 6
                        },
                        new
                        {
                            Id = 65,
                            CueType = 1,
                            Description = "At least 90 degrees down",
                            ExerciseId = 9
                        },
                        new
                        {
                            Id = 66,
                            CueType = 2,
                            Description = "Lift your heels",
                            ExerciseId = 9
                        },
                        new
                        {
                            Id = 67,
                            CueType = 1,
                            Description = "Go down as slow as you can",
                            ExerciseId = 10
                        },
                        new
                        {
                            Id = 68,
                            CueType = 2,
                            Description = "Lose tension in your back",
                            ExerciseId = 10
                        },
                        new
                        {
                            Id = 69,
                            CueType = 1,
                            Description = "Legs straight",
                            ExerciseId = 11
                        },
                        new
                        {
                            Id = 70,
                            CueType = 2,
                            Description = "Use momentum",
                            ExerciseId = 11
                        },
                        new
                        {
                            Id = 71,
                            CueType = 1,
                            Description = "Keep rings turned 45 or 90 degrees turned out",
                            ExerciseId = 12
                        },
                        new
                        {
                            Id = 72,
                            CueType = 2,
                            Description = "Shrug your shoulders",
                            ExerciseId = 12
                        },
                        new
                        {
                            Id = 73,
                            CueType = 1,
                            Description = "At least chin passes the bar at the top",
                            ExerciseId = 13
                        },
                        new
                        {
                            Id = 74,
                            CueType = 2,
                            Description = "Use momentum",
                            ExerciseId = 13
                        },
                        new
                        {
                            Id = 75,
                            CueType = 1,
                            Description = "Control your movement on the descent",
                            ExerciseId = 14
                        },
                        new
                        {
                            Id = 76,
                            CueType = 2,
                            Description = "Use a weight that's too heavy",
                            ExerciseId = 14
                        },
                        new
                        {
                            Id = 77,
                            CueType = 1,
                            Description = "Keep the tension in your core",
                            ExerciseId = 15
                        },
                        new
                        {
                            Id = 78,
                            CueType = 2,
                            Description = "Try to touch the floor",
                            ExerciseId = 15
                        });
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.PhysicalResults", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<byte>("CoreStrength")
                        .HasColumnType("tinyint");

                    b.Property<byte>("LegStrength")
                        .HasColumnType("tinyint");

                    b.Property<byte>("PullingStrength")
                        .HasColumnType("tinyint");

                    b.Property<byte>("PushingStrength")
                        .HasColumnType("tinyint");

                    b.Property<byte>("Stamina")
                        .HasColumnType("tinyint");

                    b.HasKey("Id");

                    b.ToTable("PhysicalResults");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.TrainingPlan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OwnerUid")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TrainingPlanOptionsId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TrainingPlanOptionsId")
                        .IsUnique();

                    b.ToTable("TrainingPlans", (string)null);
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.TrainingPlanOptions", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<byte>("Gender")
                        .HasColumnType("tinyint");

                    b.Property<string>("Height")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte>("HeightUnits")
                        .HasColumnType("tinyint");

                    b.Property<string>("InventoryTypes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MuscleGroupsWanted")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PhysicalResultsId")
                        .HasColumnType("int");

                    b.Property<int>("Weight")
                        .HasColumnType("int");

                    b.Property<byte>("WeightUnits")
                        .HasColumnType("tinyint");

                    b.Property<byte>("WorkoutGoal")
                        .HasColumnType("tinyint");

                    b.HasKey("Id");

                    b.HasIndex("PhysicalResultsId");

                    b.ToTable("TrainingPlanOptions", (string)null);
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.Workout", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Completed")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("OrderNr")
                        .HasColumnType("int");

                    b.Property<int>("RestAmountMs")
                        .HasColumnType("int");

                    b.Property<int>("TimeElapsedMs")
                        .HasColumnType("int");

                    b.Property<int>("WorkoutProgramId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WorkoutProgramId");

                    b.ToTable("Workouts");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.WorkoutProgram", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("TrainingPlanId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TrainingPlanId");

                    b.ToTable("WorkoutPrograms");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.WorkoutSet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("ExerciseId")
                        .HasColumnType("int");

                    b.Property<int>("OrderNr")
                        .HasColumnType("int");

                    b.Property<int>("RepsCompleted")
                        .HasColumnType("int");

                    b.Property<int>("RepsToComplete")
                        .HasColumnType("int");

                    b.Property<int>("WorkoutId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseId");

                    b.HasIndex("WorkoutId");

                    b.ToTable("WorkoutSets");
                });

            modelBuilder.Entity("ExerciseTrainingPlan", b =>
                {
                    b.HasOne("HealthyAtHomeAPI.Models.Exercise", null)
                        .WithMany()
                        .HasForeignKey("ExercisesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HealthyAtHomeAPI.Models.TrainingPlan", null)
                        .WithMany()
                        .HasForeignKey("TrainingPlansId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.ExerciseCue", b =>
                {
                    b.HasOne("HealthyAtHomeAPI.Models.Exercise", "Exercise")
                        .WithMany("ExerciseCues")
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Exercise");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.TrainingPlan", b =>
                {
                    b.HasOne("HealthyAtHomeAPI.Models.TrainingPlanOptions", "Options")
                        .WithOne("TrainingPlan")
                        .HasForeignKey("HealthyAtHomeAPI.Models.TrainingPlan", "TrainingPlanOptionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Options");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.TrainingPlanOptions", b =>
                {
                    b.HasOne("HealthyAtHomeAPI.Models.PhysicalResults", "PhysicalResults")
                        .WithMany()
                        .HasForeignKey("PhysicalResultsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PhysicalResults");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.Workout", b =>
                {
                    b.HasOne("HealthyAtHomeAPI.Models.WorkoutProgram", "WorkoutProgram")
                        .WithMany("Workouts")
                        .HasForeignKey("WorkoutProgramId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WorkoutProgram");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.WorkoutProgram", b =>
                {
                    b.HasOne("HealthyAtHomeAPI.Models.TrainingPlan", "TrainingPlan")
                        .WithMany()
                        .HasForeignKey("TrainingPlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TrainingPlan");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.WorkoutSet", b =>
                {
                    b.HasOne("HealthyAtHomeAPI.Models.Exercise", "Exercise")
                        .WithMany()
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HealthyAtHomeAPI.Models.Workout", "Workout")
                        .WithMany("WorkoutSets")
                        .HasForeignKey("WorkoutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Exercise");

                    b.Navigation("Workout");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.Exercise", b =>
                {
                    b.Navigation("ExerciseCues");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.TrainingPlanOptions", b =>
                {
                    b.Navigation("TrainingPlan")
                        .IsRequired();
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.Workout", b =>
                {
                    b.Navigation("WorkoutSets");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.WorkoutProgram", b =>
                {
                    b.Navigation("Workouts");
                });
#pragma warning restore 612, 618
        }
    }
}
