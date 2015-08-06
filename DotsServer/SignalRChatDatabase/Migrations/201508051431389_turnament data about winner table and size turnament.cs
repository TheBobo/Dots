namespace SignalRChatDatabase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class turnamentdataaboutwinnertableandsizeturnament : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GameTables", "WinnerId", c => c.String());
            AddColumn("dbo.GameTables", "TurnamentId", c => c.String());
            AddColumn("dbo.Turnaments", "SizeX", c => c.Int(nullable: false));
            AddColumn("dbo.Turnaments", "SizeY", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Turnaments", "SizeY");
            DropColumn("dbo.Turnaments", "SizeX");
            DropColumn("dbo.GameTables", "TurnamentId");
            DropColumn("dbo.GameTables", "WinnerId");
        }
    }
}
