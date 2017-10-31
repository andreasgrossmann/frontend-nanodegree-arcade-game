// Enemies our player must avoid
var Enemy = function(row) {
    // Use random x coordinates for them to start
    // Give them a random speed
    this.sprite = 'images/enemy-bug.png';
    this.width = 80;
    this.height = 50;
    this.x = this.randomNumber(-800, -50);
    this.y = row;
    this.speed = this.randomNumber(1, 2) * 50;
};

// Generate a random number between min (inclusive) and max (exclusive) whenever we need it
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
Enemy.prototype.randomNumber = function(min, max) {
  return Math.random() * (max - min) + min;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.width = 50;
    this.height = 80;
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    // Reset game when player reaches water
    // and set boundaries for the player
    if (this.y < 0) {
        alert('Woohoo, you won :)');
        this.reset();
    } else if (this.y > 400) {
        this.y = 400;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Get the player to move in different directions when relevant keys are pressed
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.x -= 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'down':
            this.y += 83;
            break;
    }
};

// Reset the player to their starting position when required
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 385;
};

// Instantiate objects
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Make vicious monster bugs
function enemyMaker(row) {
    allEnemies.push(new Enemy(row));
}

// Call monster bugs for each row straight away when the game starts
// Then make sure they keep coming
(function callEnemies() {
    enemyMaker(62);
    enemyMaker(145);
    enemyMaker(230);
    setTimeout(callEnemies, 7500);
})();

// Place the player at their starting position
var player = new Player(200, 385);

// Axis-Aligned Bounding Box collision testing
// Source: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

function checkCollisions(player, allEnemies) {
    var allEnemiesLength = allEnemies.length;
    for (var i = 0; i < allEnemiesLength; i++) {
        if (allEnemies[i].x < player.x + player.width &&
            allEnemies[i].x + allEnemies[i].width > player.x &&
            allEnemies[i].y < player.y + player.height &&
            allEnemies[i].y + allEnemies[i].height > player.y) {
            player.reset();
        }
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
