using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AdrianTalksCore.Migrations
{
    public partial class AddedCategoryTableAndRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Blog",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Blog_CategoryId",
                table: "Blog",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blog_Category_CategoryId",
                table: "Blog",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blog_Category_CategoryId",
                table: "Blog");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Blog_CategoryId",
                table: "Blog");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Blog");
        }
    }
}
