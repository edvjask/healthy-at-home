using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HealthyAtHomeAPI.Migrations
{
    public partial class InitialPostgre : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Instructions = table.Column<string>(type: "text", nullable: true),
                    ExerciseDifficulty = table.Column<byte>(type: "smallint", nullable: false),
                    InventoryTypes = table.Column<string>(type: "text", nullable: false),
                    MuscleGroups = table.Column<string>(type: "text", nullable: false),
                    ExerciseType = table.Column<byte>(type: "smallint", nullable: false),
                    YoutubeLink = table.Column<string>(type: "text", nullable: true),
                    HarderVariationId = table.Column<int>(type: "integer", nullable: true),
                    EasierVariationId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhysicalResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PullingStrength = table.Column<byte>(type: "smallint", nullable: false),
                    PushingStrength = table.Column<byte>(type: "smallint", nullable: false),
                    LegStrength = table.Column<byte>(type: "smallint", nullable: false),
                    Stamina = table.Column<byte>(type: "smallint", nullable: false),
                    CoreStrength = table.Column<byte>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhysicalResults", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseCues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CueType = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ExerciseId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseCues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExerciseCues_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainingPlanOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Gender = table.Column<byte>(type: "smallint", nullable: false),
                    Height = table.Column<string>(type: "text", nullable: false),
                    HeightUnits = table.Column<byte>(type: "smallint", nullable: false),
                    Weight = table.Column<int>(type: "integer", nullable: false),
                    WeightUnits = table.Column<byte>(type: "smallint", nullable: false),
                    Age = table.Column<int>(type: "integer", nullable: false),
                    InventoryTypes = table.Column<string>(type: "text", nullable: false),
                    PhysicalResultsId = table.Column<int>(type: "integer", nullable: false),
                    WorkoutGoal = table.Column<byte>(type: "smallint", nullable: false),
                    MuscleGroupsWanted = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingPlanOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingPlanOptions_PhysicalResults_PhysicalResultsId",
                        column: x => x.PhysicalResultsId,
                        principalTable: "PhysicalResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainingPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    OwnerUid = table.Column<string>(type: "text", nullable: false),
                    TrainingPlanOptionsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingPlans_TrainingPlanOptions_TrainingPlanOptionsId",
                        column: x => x.TrainingPlanOptionsId,
                        principalTable: "TrainingPlanOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseTrainingPlan",
                columns: table => new
                {
                    ExercisesId = table.Column<int>(type: "integer", nullable: false),
                    TrainingPlansId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseTrainingPlan", x => new { x.ExercisesId, x.TrainingPlansId });
                    table.ForeignKey(
                        name: "FK_ExerciseTrainingPlan_Exercises_ExercisesId",
                        column: x => x.ExercisesId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseTrainingPlan_TrainingPlans_TrainingPlansId",
                        column: x => x.TrainingPlansId,
                        principalTable: "TrainingPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkoutPrograms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TrainingPlanId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutPrograms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkoutPrograms_TrainingPlans_TrainingPlanId",
                        column: x => x.TrainingPlanId,
                        principalTable: "TrainingPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Workouts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderNr = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Completed = table.Column<bool>(type: "boolean", nullable: false),
                    TimeElapsedMs = table.Column<int>(type: "integer", nullable: false),
                    RestAmountMs = table.Column<int>(type: "integer", nullable: false),
                    WorkoutProgramId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workouts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Workouts_WorkoutPrograms_WorkoutProgramId",
                        column: x => x.WorkoutProgramId,
                        principalTable: "WorkoutPrograms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkoutSets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderNr = table.Column<int>(type: "integer", nullable: false),
                    ExerciseId = table.Column<int>(type: "integer", nullable: false),
                    WorkoutId = table.Column<int>(type: "integer", nullable: false),
                    RepsToComplete = table.Column<int>(type: "integer", nullable: false),
                    RepsCompleted = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutSets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkoutSets_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkoutSets_Workouts_WorkoutId",
                        column: x => x.WorkoutId,
                        principalTable: "Workouts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "EasierVariationId", "ExerciseDifficulty", "ExerciseType", "HarderVariationId", "Instructions", "InventoryTypes", "MuscleGroups", "Name", "YoutubeLink" },
                values: new object[,]
                {
                    { 1, null, (byte)1, (byte)1, 5, "Keeping body straight, lower body to floor by bending arms. Push body up until arms are extended. Repeat.", "[]", "[\"Arms\",\"Chest\",\"Shoulders\"]", "Push Up", "https://www.youtube.com/embed/IODxDxX7oi4" },
                    { 2, 10, (byte)2, (byte)4, 11, "Pull body up until chin is above bar. Lower body until arms and shoulders are fully extended. Repeat.", "[\"PullupBar\"]", "[\"Arms\",\"Back\"]", "Pull Up", "https://www.youtube.com/embed/eGo4IYlbE5g" },
                    { 3, null, (byte)2, (byte)3, null, "Lower body by bending arms, allowing elbows to flare out to sides. When slight stretch is felt in chest or shoulders, push body up until arms are straight.", "[\"Chair\",\"Table\"]", "[\"Arms\",\"Chest\",\"Shoulders\"]", "Bodyweight Dip", "https://www.youtube.com/embed/2z8JmcrW-As" },
                    { 4, null, (byte)1, (byte)2, null, "Keeping body straight, pull body up to bar. Return until arms are extended and shoulders are stretched forward.", "[\"Chair\",\"Table\"]", "[\"Arms\",\"Back\"]", "Bodyweight Row", "https://www.youtube.com/embed/PGcTxvw6" },
                    { 5, 1, (byte)2, (byte)1, 6, "Put your hands close together so the thumbs and index fingers touch, then perform a pushup.", "[]", "[\"Arms\",\"Chest\",\"Shoulders\"]", "Diamond Pushup", "https://www.youtube.com/embed/8_ILkbB9an8" },
                    { 6, 5, (byte)3, (byte)1, null, "Putting your hands sideways, lean forward with a straight body until your shoulders are in front of your hands. Perform a pushup while maintaining forward lean.", "[]", "[\"Arms\",\"Chest\",\"Shoulders\"]", "Pseudo Planche Pushup", "https://www.youtube.com/embed/TZ63httkob4" },
                    { 7, null, (byte)1, (byte)5, 8, "Raise legs by flexing hips and knees until hips are fully flexed. Continue to raise knees toward shoulders by flexing waist. Return until waist, hips, and knees are extended downward.", "[\"PullupBar\"]", "[\"Core\"]", "Hanging Leg-Hip Raise", "https://www.youtube.com/embed/QyVq5oUBpss" },
                    { 8, 7, (byte)2, (byte)5, null, "Hang from a bar. With the legs straight, raise your legs as high as you can.", "[\"PullupBar\"]", "[\"Core\"]", "Straight Leg Hanging Leg-Hip Raise", "https://www.youtube.com/embed/QyVq5oUBpss" },
                    { 9, null, (byte)1, (byte)6, null, "Squat down by bending hips back while allowing knees to bend forward, keeping back straight and knees pointed same direction as feet. Descend until thighs are just past parallel to floor. Squat up by extending knees and hips until legs are straight. Return and repeat.", "[]", "[\"Legs\"]", "Bodyweight Squat", "https://www.youtube.com/embed/gsNoPYwWXeM" },
                    { 10, null, (byte)1, (byte)4, 2, "Jump to the top of the pull-up position, then slowly (as slowly as you can), lower yourself until your arms are straight.", "[\"PullupBar\",\"GymnasticRings\"]", "[\"Back\",\"Arms\"]", "Pull Up Negatives", "https://www.youtube.com/embed/Y3ntNsIS2Q8" },
                    { 11, 2, (byte)3, (byte)4, null, "Hold your legs in an L-sit position, perform a pull-up.", "[\"PullupBar\",\"GymnasticRings\"]", "[\"Back\",\"Arms\"]", "L-Sit Pull Up", "https://www.youtube.com/embed/sbIxXuOI8D4" },
                    { 12, null, (byte)3, (byte)1, null, "Starting from a plank position with the rings turned out, perform a pushup while keeping the rings turned out.", "[\"GymnasticRings\"]", "[\"Chest\",\"Arms\",\"Shoulders\"]", "RTO Pushup", "https://www.youtube.com/embed/DxAJ3D9JhQs" },
                    { 13, 2, (byte)2, (byte)4, null, "Just like the regular pullup but with weights! Pull body up until chin is above bar. Lower body until arms and shoulders are fully extended. Repeat.", "[\"GymnasticRings\",\"PullupBar\",\"Backpack\"]", "[\"Back\",\"Arms\"]", "Weighed Pullups", "https://www.youtube.com/embed/cidxKb3nnWA" },
                    { 14, null, (byte)1, (byte)6, null, "Lunge forward with first leg. Land on heel, then forefoot. Lower body by flexing knee and hip of front leg until knee of rear leg is almost in contact with floor. Return to original standing position by forcibly extending hip and knee of forward leg. Repeat by alternating lunge with opposite leg.", "[\"Dumbbell\"]", "[\"Legs\"]", "Dumbbell Lunge", "https://www.youtube.com/embed/D7KaRcUTQeE" },
                    { 15, null, (byte)1, (byte)5, null, "Extend your elbows out at shoulder level, engage your core, and crunch down toward your hips while contracting your abs.", "[\"ResistanceBand\"]", "[\"Core\"]", "Kneeling crunch", "https://www.youtube.com/embed/AV5PmZJIrrw" }
                });

            migrationBuilder.InsertData(
                table: "ExerciseCues",
                columns: new[] { "Id", "CueType", "Description", "ExerciseId" },
                values: new object[,]
                {
                    { 1, 1, "Maintain tension", 7 },
                    { 2, 1, "Keep your legs straight", 8 },
                    { 3, 1, "Focus on contracting your back", 2 },
                    { 4, 1, "Keep a hollow body", 2 },
                    { 5, 2, "Don't use momentum", 2 },
                    { 6, 2, "Keep your arms bent at the bottom", 2 },
                    { 57, 1, "90 degrees between elbow and arms", 3 },
                    { 58, 2, "Use momentum at the bottom", 3 },
                    { 59, 1, "Focus on contracting your back", 4 },
                    { 60, 2, "Lose tension in the core", 4 },
                    { 61, 1, "Keep your hands close together", 5 },
                    { 62, 2, "Arch your lower back", 5 },
                    { 63, 1, "Maintain hollow body", 6 },
                    { 64, 2, "Lean back going up", 6 },
                    { 65, 1, "At least 90 degrees down", 9 },
                    { 66, 2, "Lift your heels", 9 },
                    { 67, 1, "Go down as slow as you can", 10 },
                    { 68, 2, "Lose tension in your back", 10 },
                    { 69, 1, "Legs straight", 11 },
                    { 70, 2, "Use momentum", 11 },
                    { 71, 1, "Keep rings turned 45 or 90 degrees turned out", 12 },
                    { 72, 2, "Shrug your shoulders", 12 },
                    { 73, 1, "At least chin passes the bar at the top", 13 },
                    { 74, 2, "Use momentum", 13 },
                    { 75, 1, "Control your movement on the descent", 14 },
                    { 76, 2, "Use a weight that's too heavy", 14 },
                    { 77, 1, "Keep the tension in your core", 15 },
                    { 78, 2, "Try to touch the floor", 15 },
                    { 238, 2, "Use momentum", 7 },
                    { 302, 1, "Use momentum", 8 },
                    { 555, 1, "Keep a hollow body", 1 },
                    { 556, 2, "Arch your lower back", 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseCues_ExerciseId",
                table: "ExerciseCues",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseTrainingPlan_TrainingPlansId",
                table: "ExerciseTrainingPlan",
                column: "TrainingPlansId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlanOptions_PhysicalResultsId",
                table: "TrainingPlanOptions",
                column: "PhysicalResultsId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlans_TrainingPlanOptionsId",
                table: "TrainingPlans",
                column: "TrainingPlanOptionsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutPrograms_TrainingPlanId",
                table: "WorkoutPrograms",
                column: "TrainingPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_WorkoutProgramId",
                table: "Workouts",
                column: "WorkoutProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutSets_ExerciseId",
                table: "WorkoutSets",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutSets_WorkoutId",
                table: "WorkoutSets",
                column: "WorkoutId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseCues");

            migrationBuilder.DropTable(
                name: "ExerciseTrainingPlan");

            migrationBuilder.DropTable(
                name: "WorkoutSets");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "Workouts");

            migrationBuilder.DropTable(
                name: "WorkoutPrograms");

            migrationBuilder.DropTable(
                name: "TrainingPlans");

            migrationBuilder.DropTable(
                name: "TrainingPlanOptions");

            migrationBuilder.DropTable(
                name: "PhysicalResults");
        }
    }
}
