(function()
{
    var global = this;
    var game;
    if(mibbu)
    {
        game = new mibbu(global.innerWidth, 400);
        game.fps().init();
        game.level = 0;
		game.animations = [];
        
        //player
        var player = game.spr("img/pig.png", 105, 80, 7);
        player.position(100, 235, 1).speed(3);
        player.animation(1);
		player.alive = true;
        player.points = 0;
        player.jump = false;
        player.shield = false;
        player.shuriken = function()
		{
			var damage = 10;
			var speed = 3;
			var shuriken = game.spr("img/shuriken.png", 15, 15, 1);
			
			var playerPosition = player.position();
			var playerSize = player.size();
            var x = playerPosition.x + playerSize.width;
            var y = playerPosition.y + (playerSize.height / 2);
			
			var animationPos = shuriken.position(x, y).speed(speed);
			animationPos = animationPos - 1;
			
			bg.off();
            player.animation(2);
            player.callback(function()
            {
                bg.on();
            }, 1);
			
			game.animations.push(function()
			{
				var shurikenPosition = shuriken.position();
	            var distanceX = shurikenPosition.x;
	            var distanceY = shurikenPosition.y;
	            distanceX = shurikenPosition.x + (2 * shuriken.speed());
	            shuriken.position(distanceX, distanceY);
			});
			
			shuriken.hit(inimigo, function()
			{
				shuriken.animation(1);
				inimigo.die();
			});
		};
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
		inimigo.moving = function()
		{
			var inimigoPosition = inimigo.position();
            var distanceX = inimigoPosition.x;
            var distanceY = inimigoPosition.y;
            distanceX = inimigoPosition.x - (2 * inimigo.speed());
            inimigo.position(distanceX, distanceY);
		};
		game.animations.push(inimigo.moving);
		inimigo.die = function()
		{
			inimigo.animation(3);
			//inimigo.callback(game.off, 2);
		};
        
        var keyControll = function(e)
        {
            var keyCode = e.keyCode;
            
            if(keyCode == 88 && player.alive)
            {
                //x
				player.shuriken();
            }
            
            if(keyCode == 32)
            {
                player.jump = true;
            }
        };
        
        var stopAnimate = function(e)
        {
			if(player.alive)
			{
				player.animation(1);
			}
        };
        
        game.on();
        game.hook(function()
		{
			if(game.animations && game.animations.length > 0)
			{
				for(var i = 0; i < game.animations.length; i++)
				{
					game.animations[i]();
				}
			}
		});
        game.hitsOn();
        
        global.addEventListener("keydown", keyControll, false);
        global.addEventListener("keyup", stopAnimate, false);
    }
}());