(function() {
  var global = this;
  var game;
  if (mibbu) {
    game = new mibbu(global.innerWidth, 400);
    game.fps().init();
    game.level = 0;
    game.animations = [];
    
    //player
    var player = game.spr("img/pig.png", 105, 80, 7);
    player.top = 235;
    player.left = 100;
    player.maxHeight = player.top - 200;
    player.position(player.left, player.top, 1).speed(3);
    player.animation(1);
    player.alive = true;
    player.points = 0;
    player.shield = false;
    player.jump = false;
    player.isJumping = false;
    player.up = false;
    player.down = true;

    player.jumpUp = function() {
      var playerPosition = player.position();
      var distanceX = playerPosition.x;
      var distanceY = playerPosition.y;

      if (distanceY > player.maxHeight) {
        distanceY = playerPosition.y - (3 * player.speed());
        player.position(distanceX, distanceY);
      } else {
        player.up = false;
        player.down = true;
      }
    };

    player.jumpDown = function() {
      var playerPosition = player.position();
      var distanceX = playerPosition.x;
      var distanceY = playerPosition.y;

      if (distanceY < player.top) {
        distanceY = playerPosition.y + (3 * player.speed());
        player.position(distanceX, distanceY);
      } else {
        player.down = false;
        player.jump = false;
        player.isJumping = false;
      }
    };

    player.die = function() {
      if (!player.shield) {
        player.animation(0);
        player.callback(function() {
          player.alive = false;
          player.frame(7);
          bg.off();
          inimigo.callback(function()
          {
            game.off();
          }, 2);
        }, 1);
      } else {
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

    inimigo.moving = function() {
      var inimigoPosition = inimigo.position();
      var distanceX = inimigoPosition.x;
      var distanceY = inimigoPosition.y;
      distanceX = inimigoPosition.x - (2 * inimigo.speed());
      inimigo.position(distanceX, distanceY);
    };

    game.animations.push(inimigo.moving);

    inimigo.die = function() {
      inimigo.animation(3);
    };

    var keyPressed = function(e) {
      var keyCode = e.keyCode;

      if (keyCode == 32 && !player.isJumping) {
        player.jump = true;
        player.up = true;
        player.isJumping = true;
      }
    };

    var keyReleased = function(e) {
      var keyCode = e.keyCode;
    }

    var stopAnimate = function(e) {
      if (player.alive) {
        player.animation(1);
      }
    };

    game.on();

    game.hook(function() {
      if (game.animations && game.animations.length > 0) {
        for (var i = 0; i < game.animations.length; i++) {
          game.animations[i]();
        }
      }

      if (player.isJumping) {
        if (player.up) {
          player.jumpUp();
        } else if (player.down) {
          player.jumpDown();
        }
      }
    });

    game.hitsOn();

    global.addEventListener("keydown", keyPressed, false);
    global.addEventListener("keyup", keyReleased, false);
    global.addEventListener("keyup", stopAnimate, false);
  }
}());