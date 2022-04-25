using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyAtHomeAPI.Migrations
{
    public partial class MoreDattaAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ExerciseCues",
                columns: new[] { "Id", "CueType", "Description", "ExerciseId" },
                values: new object[,]
                {
                    { 3, 1, "Focus on contracting your back", 2 },
                    { 4, 1, "Keep a hollow body", 2 },
                    { 5, 2, "Don't use momentum", 2 },
                    { 6, 2, "Keep your arms bent at the bottom", 2 }
                });

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "EasierVariationId", "ExerciseDifficulty", "HarderVariationId", "YoutubeLink" },
                values: new object[] { 10, (byte)2, 11, "https://www.youtube.com/embed/eGo4IYlbE5g" });

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "EasierVariationId", "ExerciseDifficulty", "ExerciseType", "HarderVariationId", "Instructions", "InventoryTypes", "MuscleGroups", "Name", "YoutubeLink" },
                values: new object[,]
                {
                    { 10, null, (byte)1, (byte)4, 2, "Jump to the top of the pull-up position, then slowly (as slowly as you can), lower yourself until your arms are straight.", "[\"PullupBar\",\"GymnasticRings\"]", "[\"Back\",\"Arms\"]", "Pull Up Negatives", "https://www.youtube.com/embed/Y3ntNsIS2Q8" },
                    { 11, 2, (byte)3, (byte)4, null, "Hold your legs in an L-sit position, perform a pull-up.", "[\"PullupBar\",\"GymnasticRings\"]", "[\"Back\",\"Arms\"]", "L-Sit Pull Up", "https://www.youtube.com/embed/sbIxXuOI8D4" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "EasierVariationId", "ExerciseDifficulty", "HarderVariationId", "YoutubeLink" },
                values: new object[] { null, (byte)1, null, null });
        }
    }
}
