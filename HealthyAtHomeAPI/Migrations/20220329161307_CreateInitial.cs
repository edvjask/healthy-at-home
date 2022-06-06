using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyAtHomeAPI.Migrations
{
    public partial class CreateInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Instructions = table.Column<string>(type: "nvarchar(max)", maxLength: 4000, nullable: true),
                    ExerciseDifficulty = table.Column<byte>(type: "tinyint", nullable: false),
                    InventoryTypes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MuscleGroups = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExerciseType = table.Column<byte>(type: "tinyint", nullable: false),
                    YoutubeLink = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HarderVariationId = table.Column<int>(type: "int", nullable: true),
                    EasierVariationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhysicalResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PullingStrength = table.Column<byte>(type: "tinyint", nullable: false),
                    PushingStrength = table.Column<byte>(type: "tinyint", nullable: false),
                    LegStrength = table.Column<byte>(type: "tinyint", nullable: false),
                    Stamina = table.Column<byte>(type: "tinyint", nullable: false),
                    CoreStrength = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhysicalResults", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseCues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CueType = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExerciseId = table.Column<int>(type: "int", nullable: false)
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Gender = table.Column<byte>(type: "tinyint", nullable: false),
                    Height = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HeightUnits = table.Column<byte>(type: "tinyint", nullable: false),
                    Weight = table.Column<int>(type: "int", nullable: false),
                    WeightUnits = table.Column<byte>(type: "tinyint", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    InventoryTypes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhysicalResultsId = table.Column<int>(type: "int", nullable: false),
                    WorkoutGoal = table.Column<byte>(type: "tinyint", nullable: false),
                    MuscleGroupsWanted = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerUid = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrainingPlanOptionsId = table.Column<int>(type: "int", nullable: false)
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
                    ExercisesId = table.Column<int>(type: "int", nullable: false),
                    TrainingPlansId = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "EasierVariationId", "ExerciseDifficulty", "ExerciseType", "HarderVariationId", "Instructions", "InventoryTypes", "MuscleGroups", "Name", "YoutubeLink" },
                values: new object[,]
                {
                    { 1, null, (byte)1, (byte)1, null, "Keeping body straight, lower body to floor by bending arms. Push body up until arms are extended. Repeat.", "[]", "[\"Arms\",\"Chest\",\"Shoulders\"]", "Push Up", null },
                    { 2, null, (byte)1, (byte)4, null, "Pull body up until chin is above bar. Lower body until arms and shoulders are fully extended. Repeat.", "[\"PullupBar\"]", "[\"Arms\",\"Back\"]", "Pull Up", null },
                    { 3, null, (byte)2, (byte)3, null, "Lower body by bending arms, allowing elbows to flare out to sides. When slight stretch is felt in chest or shoulders, push body up until arms are straight.", "[\"Chair\",\"Table\"]", "[\"Arms\",\"Chest\",\"Shoulders\"]", "Bodyweight Dip", null },
                    { 4, null, (byte)1, (byte)2, null, "Keeping body straight, pull body up to bar. Return until arms are extended and shoulders are stretched forward.", "[\"Chair\",\"Table\"]", "[\"Arms\",\"Back\"]", "Bodyweight Row", null },
                    { 5, null, (byte)2, (byte)1, null, "Put your hands close together so the thumbs and index fingers touch, then perform a pushup.", "[]", "[\"Arms\",\"Chest\",\"Shoulders\"]", "Diamond Pushup", null },
                    { 6, null, (byte)3, (byte)1, null, "Put your hands close together so the thumbs and index fingers touch, then perform a pushup.", "[]", "[\"Arms\",\"Chest\",\"Shoulders\"]", "Pseudo Planche Pushup", null }
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseCues");

            migrationBuilder.DropTable(
                name: "ExerciseTrainingPlan");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "TrainingPlans");

            migrationBuilder.DropTable(
                name: "TrainingPlanOptions");

            migrationBuilder.DropTable(
                name: "PhysicalResults");
        }
    }
}
