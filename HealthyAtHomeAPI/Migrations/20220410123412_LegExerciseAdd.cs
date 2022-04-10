using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyAtHomeAPI.Migrations
{
    public partial class LegExerciseAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "EasierVariationId", "ExerciseDifficulty", "ExerciseType", "HarderVariationId", "Instructions", "InventoryTypes", "MuscleGroups", "Name", "YoutubeLink" },
                values: new object[] { 9, null, (byte)1, (byte)6, null, "Squat down by bending hips back while allowing knees to bend forward, keeping back straight and knees pointed same direction as feet. Descend until thighs are just past parallel to floor. Squat up by extending knees and hips until legs are straight. Return and repeat.", "[]", "[\"Legs\"]", "Bodyweight Squat", "https://www.youtube.com/embed/gsNoPYwWXeM" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 9);
        }
    }
}
