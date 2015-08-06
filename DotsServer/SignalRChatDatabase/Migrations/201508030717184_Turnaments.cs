namespace SignalRChatDatabase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Turnaments : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Turnaments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Seats = c.Int(nullable: false),
                        StartTime = c.DateTime(nullable: false),
                        IsSeatAndGo = c.Boolean(nullable: false),
                        RegistationOpen = c.Boolean(nullable: false),
                        EntryCost = c.Double(nullable: false),
                        Taxes = c.Int(nullable: false),
                        TakenSeats = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UsersTurnaments",
                c => new
                    {
                        Users_Id = c.Int(nullable: false),
                        Turnaments_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Users_Id, t.Turnaments_Id })
                .ForeignKey("dbo.Users", t => t.Users_Id, cascadeDelete: true)
                .ForeignKey("dbo.Turnaments", t => t.Turnaments_Id, cascadeDelete: true)
                .Index(t => t.Users_Id)
                .Index(t => t.Turnaments_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UsersTurnaments", "Turnaments_Id", "dbo.Turnaments");
            DropForeignKey("dbo.UsersTurnaments", "Users_Id", "dbo.Users");
            DropIndex("dbo.UsersTurnaments", new[] { "Turnaments_Id" });
            DropIndex("dbo.UsersTurnaments", new[] { "Users_Id" });
            DropTable("dbo.UsersTurnaments");
            DropTable("dbo.Turnaments");
        }
    }
}
