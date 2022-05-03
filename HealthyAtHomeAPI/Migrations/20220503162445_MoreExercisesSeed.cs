using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyAtHomeAPI.Migrations
{
    public partial class MoreExercisesSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ExerciseCues",
                columns: new[] { "Id", "CueType", "Description", "ExerciseId" },
                values: new object[,]
                {
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
                    { 238, 2, "Use momentum", 7 },
                    { 302, 1, "Use momentum", 8 },
                    { 555, 2, "Keep a hollow body", 1 },
                    { 556, 1, "Arch your lower back", 1 }
                });

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "HarderVariationId", "YoutubeLink" },
                values: new object[] { 5, "https://www.youtube.com/embed/IODxDxX7oi4" });

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 3,
                column: "YoutubeLink",
                value: "https://www.youtube.com/embed/2z8JmcrW-As");

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 4,
                column: "YoutubeLink",
                value: "https://www.youtube.com/embed/PGcTxvw6");

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "EasierVariationId", "HarderVariationId", "YoutubeLink" },
                values: new object[] { 1, 6, "https://www.youtube.com/embed/8_ILkbB9an8" });

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "EasierVariationId", "Instructions", "YoutubeLink" },
                values: new object[] { 5, "Putting your hands sideways, lean forward with a straight body until your shoulders are in front of your hands. Perform a pushup while maintaining forward lean.", "https://www.youtube.com/embed/TZ63httkob4" });

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 8,
                column: "Instructions",
                value: "Hang from a bar. With the legs straight, raise your legs as high as you can.");

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "EasierVariationId", "ExerciseDifficulty", "ExerciseType", "HarderVariationId", "Instructions", "InventoryTypes", "MuscleGroups", "Name", "YoutubeLink" },
                values: new object[,]
                {
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
                    { 71, 1, "Keep rings turned 45 or 90 degrees turned out", 12 },
                    { 72, 2, "Shrug your shoulders", 12 },
                    { 73, 1, "At least chin passes the bar at the top", 13 },
                    { 74, 2, "Use momentum", 13 },
                    { 75, 1, "Control your movement on the descent", 14 },
                    { 76, 2, "Use a weight that's too heavy", 14 },
                    { 77, 1, "Keep the tension in your core", 15 },
                    { 78, 2, "Try to touch the floor", 15 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 57);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 58);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 59);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 60);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 61);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 62);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 63);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 64);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 65);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 66);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 67);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 68);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 69);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 70);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 71);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 72);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 73);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 74);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 75);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 76);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 77);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 78);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 238);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 302);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 555);

            migrationBuilder.DeleteData(
                table: "ExerciseCues",
                keyColumn: "Id",
                keyValue: 556);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "HarderVariationId", "YoutubeLink" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 3,
                column: "YoutubeLink",
                value: null);

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 4,
                column: "YoutubeLink",
                value: null);

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "EasierVariationId", "HarderVariationId", "YoutubeLink" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "EasierVariationId", "Instructions", "YoutubeLink" },
                values: new object[] { null, "Put your hands close together so the thumbs and index fingers touch, then perform a pushup.", null });

            migrationBuilder.UpdateData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 8,
                column: "Instructions",
                value: "Raise legs by flexing hips and knees until hips are fully flexed. Continue to raise knees toward shoulders by flexing waist. Return until waist, hips, and knees are extended downward.");
        }
    }
}
