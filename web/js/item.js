var Item;

(function() {
  Item = function(game) {
    var item = game.spr("img/cupcake-sprite.png", 45, 65, 1);
    item.position(global.innerWidth - 45, 250, 1).speed(3);
    item.animation(0);
    item.hp = 30;

    item.hit(game.player, function() {
      if (!game.player.smiling) {
        game.player.increaseHP(item.hp);
        game.player.showStatus(item.hp, true, "hp");
        item.animation(1);
        game.player.smiling = true;
        setTimeout(function() {
          game.player.smiling = false;
        }, 3000);
      }
    });

    item.moving = function() {
      var itemPosition = item.position();
      var distanceX = itemPosition.x;
      var distanceY = itemPosition.y;

      distanceX = itemPosition.x - (2 * item.speed());
      item.position(distanceX, distanceY);

      if (distanceX <= -(item.size().width + 10)) {
        game.itemsAnimations.splice(0, 1);
        game.items.splice(0, 1);
      }
    };

    game.itemsAnimations.push(item.moving);

    return item;
  };
}());