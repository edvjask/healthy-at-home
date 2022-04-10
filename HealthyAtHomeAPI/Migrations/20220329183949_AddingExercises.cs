using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyAtHomeAPI.Migrations
{
    public partial class AddingExercises : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "EasierVariationId", "ExerciseDifficulty", "ExerciseType", "HarderVariationId", "Instructions", "InventoryTypes", "MuscleGroups", "Name", "YoutubeLink" },
                values: new object[] { 7, null, (byte)1, (byte)5, 8, "Raise legs by flexing hips and knees until hips are fully flexed. Continue to raise knees toward shoulders by flexing waist. Return until waist, hips, and knees are extended downward.", "[\"PullupBar\"]", "[\"Core\"]", "Hanging Leg-Hip Raise", "https://www.youtube.com/embed/QyVq5oUBpss" });

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "EasierVariationId", "ExerciseDifficulty", "ExerciseType", "HarderVariationId", "Instructions", "InventoryTypes", "MuscleGroups", "Name", "YoutubeLink" },
                values: new object[] { 8, 7, (byte)2, (byte)5, null, "Raise legs by flexing hips and knees until hips are fully flexed. Continue to raise knees toward shoulders by flexing waist. Return until waist, hips, and knees are extended downward.", "[\"PullupBar\"]", "[\"Core\"]", "Straight Leg Hanging Leg-Hip Raise", "https://www.youtube.com/embed/QyVq5oUBpss" });

            migrationBuilder.InsertData(
                table: "ExerciseCues",
                columns: new[] { "Id", "CueType", "Description", "ExerciseId" },
                values: new object[] { 1, 1, "Maintain tension", 7 });

            migrationBuilder.InsertData(
                table: "ExerciseCues",
                columns: new[] { "Id", "CueType", "Description", "ExerciseId" },
                values: new object[] { 2, 1, "Keep your legs straight", 8 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 8);
        }
    }
}
