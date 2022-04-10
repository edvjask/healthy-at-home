﻿// <auto-generated />
using System;
using HealthyAtHomeAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HealthyAtHomeAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220329161307_CreateInitial")]
    partial class CreateInitial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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
                            Instructions = "Keeping body straight, lower body to floor by bending arms. Push body up until arms are extended. Repeat.",
                            InventoryTypes = "[]",
                            MuscleGroups = "[\"Arms\",\"Chest\",\"Shoulders\"]",
                            Name = "Push Up"
                        },
                        new
                        {
                            Id = 5,
                            ExerciseDifficulty = (byte)2,
                            ExerciseType = (byte)1,
                            Instructions = "Put your hands close together so the thumbs and index fingers touch, then perform a pushup.",
                            InventoryTypes = "[]",
                            MuscleGroups = "[\"Arms\",\"Chest\",\"Shoulders\"]",
                            Name = "Diamond Pushup"
                        },
                        new
                        {
                            Id = 6,
                            ExerciseDifficulty = (byte)3,
                            ExerciseType = (byte)1,
                            Instructions = "Put your hands close together so the thumbs and index fingers touch, then perform a pushup.",
                            InventoryTypes = "[]",
                            MuscleGroups = "[\"Arms\",\"Chest\",\"Shoulders\"]",
                            Name = "Pseudo Planche Pushup"
                        },
                        new
                        {
                            Id = 3,
                            ExerciseDifficulty = (byte)2,
                            ExerciseType = (byte)3,
                            Instructions = "Lower body by bending arms, allowing elbows to flare out to sides. When slight stretch is felt in chest or shoulders, push body up until arms are straight.",
                            InventoryTypes = "[\"Chair\",\"Table\"]",
                            MuscleGroups = "[\"Arms\",\"Chest\",\"Shoulders\"]",
                            Name = "Bodyweight Dip"
                        },
                        new
                        {
                            Id = 4,
                            ExerciseDifficulty = (byte)1,
                            ExerciseType = (byte)2,
                            Instructions = "Keeping body straight, pull body up to bar. Return until arms are extended and shoulders are stretched forward.",
                            InventoryTypes = "[\"Chair\",\"Table\"]",
                            MuscleGroups = "[\"Arms\",\"Back\"]",
                            Name = "Bodyweight Row"
                        },
                        new
                        {
                            Id = 2,
                            ExerciseDifficulty = (byte)1,
                            ExerciseType = (byte)4,
                            Instructions = "Pull body up until chin is above bar. Lower body until arms and shoulders are fully extended. Repeat.",
                            InventoryTypes = "[\"PullupBar\"]",
                            MuscleGroups = "[\"Arms\",\"Back\"]",
                            Name = "Pull Up"
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

            modelBuilder.Entity("HealthyAtHomeAPI.Models.Exercise", b =>
                {
                    b.Navigation("ExerciseCues");
                });

            modelBuilder.Entity("HealthyAtHomeAPI.Models.TrainingPlanOptions", b =>
                {
                    b.Navigation("TrainingPlan")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
