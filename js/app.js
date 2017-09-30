
// Add some sound to the game
var mySound = new sound("images/whack.mp3");
var winSound = new sound("images/win.mp3");
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

// Enemies our player must avoid
var Enemy = function(x, y, move) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.move = move;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.move * dt;

    // To make enemies loop again
    if (this.x >= 505) {
     this.x = 0;
    }

    // Check for collision with enemies or barrier-walls
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player in our game
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, move) {
    this.x = x;
    this.y = y;
    this.move = move;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  // To aviod player run out of canves
    if (player.y > 400 ) {
          player.y = 400;
      }
      if (player.x > 400) {
          player.x = 400;
      }
      if (player.x < 0) {
          player.x = 0;
      }
}

Player.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
}

// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keypressed) {
    if (keypressed == 'left') {
        player.x -= player.move;
    }
    if (keypressed == 'up') {
        player.y -= player.move;
    }
    if (keypressed == 'right') {
        player.x += player.move;
    }
    if (keypressed == 'down') {
        player.y += player.move;
    }

};

var checkCollision = function(anEnemy) {
// To check collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
        mySound.play();
        player.reset();
    }
// To check if player enter win area
    if (player.y <= 0) {
    //  alert ("you WIN!!");
      player.reset();
        winSound.play();
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 505, 171);
      score += 1;
      increaseDifficulty(score);
    }
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(200, 400, 50);
var score = 0;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
