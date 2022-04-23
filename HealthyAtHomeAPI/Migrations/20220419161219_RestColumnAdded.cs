using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyAtHomeAPI.Migrations
{
    public partial class RestColumnAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RestAmountMs",
                table: "Workouts",
                type: "int",
                nullable: false,
                defaultValue: 60 * 1000);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RestAmountMs",
                table: "Workouts");
        }
    }
}
