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
    player.maxHP = 200;
    player.hp = player.maxHP;
    player.level = 1;
    player.xp = 0;
    player.crying = false;
    player.smiling = false;

    player.elements = {
      hpBar: document.getElementById("hp-bar"),
      statusText: document.getElementById("status-text")
    };

    player.showStatus = function(value, increased, type) {
      player.elements.statusText.style.visibility = "visible";
      player.elements.statusText.innerHTML = (increased ? "+" : "-") + value + type;
      player.elements.statusText.className = increased ? "increased" : "decreased";
      setTimeout(function() {
        player.elements.statusText.style.visibility = "hidden";
      }, 1000);
    };

    player.increaseXP = function(xp) {
      player.xp += xp;
      player.showStatus(xp, true, "xp");
      if (player.xp >= game.nextLevelXP) {
        player.level++;
        game.nextLevelXP = game.nextLevelXP * 2;
      }
    };

    player.decreaseHP = function(hp) {
      if (player.hp - hp < 0) {
        player.hp = 0;
      } else {
        player.hp = player.hp - hp;
      }
      player.elements.hpBar.style.width = ((player.hp * 100) / player.maxHP) + "%";
    };

    player.increaseHP = function(hp) {
      if (player.hp + hp > player.maxHP) {
        player.hp = player.maxHP;
      } else {
        player.hp = player.hp + hp;
      }
      player.elements.hpBar.style.width = ((player.hp * 100) / player.maxHP) + "%";
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
      player.decreaseHP(enemy.hp);
      player.showStatus(enemy.hp, false, "HP");
      player.crying = true;
      player.callback(function() {
        if (player.hp <= 0) {
          player.die(enemy);
        } else {
          player.animation(1);
          setTimeout(function() {
            player.crying = false;
          }, 3000);
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
