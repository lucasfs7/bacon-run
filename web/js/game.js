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
        var player = game.spr("img/pig.png", 105, 80, 7);
        player.position(100, 235, 1).speed(3);
        player.animation(1);
        player.points = 0;
        player.jump = false;
        player.shield = false;
        player.shuriken = { sprite: "img/shuriken.png", speed: 3, damage: 10 };
        player.alive = true;
        player.die = function()
        {
            if(!player.shield)
            {
                player.animation(0);
                player.callback(function()
                {
                    player.alive = false;
                    player.frame(7);
                    bg.off();
                    inimigo.callback(function()
                    {
                        game.off();
                    }, 2);
                }, 1);
            }
            else
            {
                inimigo.animation(3);
                player.shield = false;
            }
        };
        
        //bg
        var bg = game.bg("img/bg.jpg", 3, "W", { x:0,y:0 });
        bg.on();
        
        //inimigo
        var inimigo = game.spr("img/zero.png", 45, 65, 9);
        inimigo.position(global.innerWidth - 45, 250, 1).speed(3);
        inimigo.animation(2);
        inimigo.jump = false;
        inimigo.hit(player, player.die);
        
        var keyControll = function(e)
        {
            var keyCode = e.keyCode;
            
            if(keyCode == 88 && player.alive)
            {
                //x
                player.shield = true;
                bg.off();
                player.animation(2);
                player.callback(function()
                {
                    bg.on();
                }, 1)
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