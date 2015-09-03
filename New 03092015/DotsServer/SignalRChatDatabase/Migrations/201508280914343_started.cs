namespace SignalRChatDatabase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class started : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Turnaments", "isStarted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Turnaments", "isStarted");
        }
    }
}
