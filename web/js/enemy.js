var global = this;
var Enemy;

(function() {
  Enemy = function(game) {
    var enemy = game.spr("img/zero.png", 45, 65, 9);
    enemy.position(global.innerWidth - 45, 250, 1).speed(3);
    enemy.animation(2);
    enemy.xp = 100;
    enemy.hp = 10;
    enemy.dead = false;

    enemy.hit(game.player, function() {
      if (!game.player.shield) {
        if (!game.player.crying) {
          game.player.hurt(enemy);
        }
      } else {
        enemy.die();
      }
    });

    enemy.moving = function() {
      var enemyPosition = enemy.position();
      var distanceX = enemyPosition.x;
      var distanceY = enemyPosition.y;

      distanceX = enemyPosition.x - (2 * enemy.speed());
      enemy.position(distanceX, distanceY);

      if (distanceX <= -(enemy.size().width + 10)) {
        game.animations.splice(0, 1);
        game.enemies.splice(0, 1);
        if (enemy.dead) {
          game.player.increaseXP(enemy.xp);
        }
      }
    };

    game.animations.push(enemy.moving);

    enemy.die = function() {
      enemy.animation(3);
      enemy.dead = true;
    };

    return enemy;
  };
}());