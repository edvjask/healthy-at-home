using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyAtHomeAPI.Migrations
{
    public partial class TimeElapsedColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimeElapsedMs",
                table: "Workouts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeElapsedMs",
                table: "Workouts");
        }
    }
}
