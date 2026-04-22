using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AdrianTalksCore.Migrations
{
    /// <inheritdoc />
    public partial class AddedBlogViewCountRelationWithBlogTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlogViewCount",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BlogId = table.Column<int>(type: "int", nullable: false),
                    ViewCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogViewCount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlogViewCount_Blog_BlogId",
                        column: x => x.BlogId,
                        principalTable: "Blog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlogViewCount_BlogId",
                table: "BlogViewCount",
                column: "BlogId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogViewCount");
        }
    }
}
