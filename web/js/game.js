(function() {
  var global = this;
  var game;
  if (mibbu) {
    game = new mibbu(global.innerWidth, 400);
    game.fps().init();
    game.nextLevelXP = 400;
    game.animations = [];
    game.enemies = [];
    game.enemiesInterval;

    game.startCreatingEnemies = function() {
      game.enemiesInterval = setTimeout(function() {
        game.enemies.push(new Enemy(game));
        game.startCreatingEnemies();
      }, ((5 / game.player.level) * 1000));
    };
    
    //player
    game.player = new Player(game);

    //bg
    game.scenario = game.bg("img/bg.jpg", 3, "W", { x:0,y:0 });
    game.scenario.on();

    //enemies
    game.enemies.push(new Enemy(game));
    game.startCreatingEnemies();

    var keyPressed = function(e) {
      var keyCode = e.keyCode;

      if (keyCode == 32 && !game.player.isJumping) {
        game.player.jump = true;
        game.player.up = true;
        game.player.isJumping = true;
      }

      if (keyCode == 90) {
        game.player.animation(0);
        game.player.shield = true;
      }
    };

    var keyReleased = function(e) {
      var keyCode = e.keyCode;

      if (keyCode == 90) {
        setTimeout(function() {
          game.player.shield = false;
        }, 1000);
      }
    }

    var stopAnimate = function(e) {
      if (game.player.alive) {
        game.player.animation(1);
      }
    };

    game.on();

    game.hook(function() {
      if (game.animations && game.animations.length > 0) {
        for (var i = 0; i < game.animations.length; i++) {
          game.animations[i]();
        }
      }

      if (game.player.isJumping) {
        if (game.player.up) {
          game.player.jumpUp();
        } else if (game.player.down) {
          game.player.jumpDown();
        }
      }
    });

    game.hitsOn();

    global.addEventListener("keydown", keyPressed, false);
    global.addEventListener("keyup", keyReleased, false);
    global.addEventListener("keyup", stopAnimate, false);
  }
}());
