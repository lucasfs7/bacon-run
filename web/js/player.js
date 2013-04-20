var Player;

(function() {
  Player = function(game) {
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
    player.hp = 200;
    player.level = 1;
    player.xp = 0;
    player.crying = false;

    player.increaseXP = function(xp) {
      player.xp += xp;
      if (player.xp >= game.nextLevelXP) {
        player.level++;
        game.nextLevelXP = game.nextLevelXP * 2;
      }
    };

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

    player.hurt = function(enemy) {
      player.animation(0);
      player.hp = player.hp - enemy.hp;
      player.crying = true;
      player.callback(function() {
        if (player.hp <= 0) {
          player.die(enemy);
        } else {
          player.animation(1);
          setTimeout(function() {
            player.crying = false;
          }, 1000);
        }
      }, 1);
    };

    player.die = function(enemy) {
      player.animation(0);
      player.callback(function() {
        player.alive = false;
        player.frame(7);
        game.scenario.off();
        enemy.callback(function() {
          game.off();
        }, 2);
      }, 1);
    };

    return player;
  }
}());
