(function()
{
    var global = this;
    var game;
    if(mibbu)
    {
        game = new mibbu(global.innerWidth, 400);
        game.fps().init();
        game.level = 0;
        
        //player
        var player = game.spr("img/zero.png", 45, 65, 9);
        player.position(100, 245, 1).speed(3);
        player.animation(1);
        player.jump = false;
        player.espada = false;
        player.soco = false;
        
        //bg
        var bg = game.bg("img/bg.jpg", 3, "W", { x:0,y:0 });
        bg.on();
        
        //inimigo
        var inimigo = game.spr("img/zero.png", 45, 65, 9);
        inimigo.position(global.innerWidth - 45, 245, 1).speed(3);
        inimigo.animation(2);
        inimigo.jump = false;
        
        inimigo.hit(player, function()
        {
            if(!player.espada && !player.soco)
            {
                game.off();
            }
            else
            {
                inimigo.animation(3);
            }
        });
        
        var keyControll = function(e)
        {
            var keyCode = e.keyCode;
            
            if(keyCode == 88)
            {
                //x
                player.espada = true;
                player.animation(0);
            }
            else if(keyCode == 90)
            {
                //z
                player.soco = true;
                player.animation(3);
            }
            
            if(keyCode == 32)
            {
                player.jump = true;
            }
        };
        
        var animate = function()
        {
            var inimigoPosition = inimigo.position();
            var distanceX = inimigoPosition.x;
            var distanceY = inimigoPosition.y;
            
            distanceX = inimigoPosition.x - (2 * inimigo.speed());
            
            inimigo.position(distanceX, distanceY);
        };
        
        var stopAnimate = function(e)
        {
            player.espada = false;
            player.soco = false;
            player.animation(1);
        };
        
        game.on();
        game.hook(animate);
        game.hitsOn();
        
        global.addEventListener("keydown", keyControll, false);
        global.addEventListener("keyup", stopAnimate, false);
    }
}());