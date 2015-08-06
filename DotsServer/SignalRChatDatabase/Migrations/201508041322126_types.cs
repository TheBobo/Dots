namespace SignalRChatDatabase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class types : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Turnaments", "Type", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Turnaments", "Type");
        }
    }
}
