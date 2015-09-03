namespace SignalRChatDatabase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GameTables",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Rows = c.Int(nullable: false),
                        Cols = c.Int(nullable: false),
                        GameId = c.String(),
                        UserInTurn = c.String(),
                        WinnerId = c.String(),
                        TurnamentId = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MoveTables",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        TableId = c.String(),
                        Board = c.String(),
                        CellTaken = c.String(),
                        TimeMove = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
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
                        Type = c.Int(nullable: false),
                        SizeX = c.Int(nullable: false),
                        SizeY = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserWebClientId = c.String(),
                        DeviceId = c.String(maxLength: 20),
                        Username = c.String(maxLength: 20),
                        IsOnline = c.Boolean(nullable: false),
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
            DropTable("dbo.Users");
            DropTable("dbo.Turnaments");
            DropTable("dbo.MoveTables");
            DropTable("dbo.GameTables");
        }
    }
}
