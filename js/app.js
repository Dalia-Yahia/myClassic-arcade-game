// starter  of the Game
let startModel = document.querySelector(".starter");
let overlay = document.querySelector(".overlay");
let gameEnd = document.querySelector(".game-over");
let winModel = document.querySelector(".winner");

let playerPoints = 0;
let playerLives = 5;

//this function starts the game when click
//accept the challenge button
function startGame(){
    startModel.classList.add("hide");
    overlay.classList.add("hide");
}

// when player loses all the lives
function gameOver(){
    overlay.classList.add("show");
    gameEnd.classList.add("show");
}

// this function resets the game
function resetGame(){
    window.location.reload(true);
}

// funtion runs to check lives
function checkLives(){
    if (allLives.length === 0){
        gameOver();
    }
}

// model of  victory when the player win all the 5 gems
function Winner(){
    overlay.classList.add("show");
    winModel.classList.add("show");
}

// draw our game parts: the player, the bugs and the gems

// Enemies whose the player must avoid
//start ENEMY
var Enemy = function (x, y, speed) {
    // The following variables are used to determine the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image of the enemy of cockroach that is added to the playing field
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;
    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }
    // Checks for collisions between the player and the enemies
    // through the x/y space between the player and the enemy
    else if ((player.x < this.x + 70) &&
    (player.x + 70 > this.x) &&
    (player.y < this.y + 40) &&
    (player.y + 40 > this.y)) {
        player.reset();
        allLives.pop();
        playerLives -= 1;
        if (playerPoints >= 50) {
            playerPoints -= 50;
        }
    };
    checkLives();
};

// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// end ENEMY

// start  PLAYER
// Player class focusing on x and y axis
var Player = function (x, y) {
    // Variables for the player to move along x and y axis
    this.x = x;
    this.y = y;
    this.player = 'images/char-princess-girl.png';
};

let playerX,payerY;
Player.prototype.update = function (dt) {
    playerX = this.x;
    playerY = this.y;
};

// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// handle the movements of the player by using arrow keys
Player.prototype.handleInput = function (keyPress) {
    // Enable user with left arrow key to move left on the x axis by 102
    // and prevent user to go off the game tiles on the left side
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    }
    // Enable user with right arrow key to move right on the x axis by 102
    // and prevent user to go off the game tiles on the right side
    else if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }
    // Enables user with up arrow key to move upwards on the y axis by 83
    // and prevent user to go off the game tiles on the top side
    else if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    }
    // Enables user with down arrow key to move downwards on the y axis by 83
    // and prevent user to go off the game tiles on the bottom side
    else if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    }
    // Once the user reaches the top of the page; the water, the user is
    // Instantly reset to the starting position
    else if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 600);
        };
};

// to reset player to original position
Player.prototype.reset = function() {
  this.x = 202;
  this.y = 405;
}
//end PLAYER

//start LIVES
var Lives = function(x, y) {
    this.x = x;
    this.y = y
    this.sprite = 'images/Heart.png';
};

// render method for Lives class
Lives.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 28, 42);
}
// end LIVES

// start GEM  class and winning
var Gem = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Gem Green.png';
}

// draws gems on the canvas
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 90, 103);
}

//winning block class to figure out when a player wins
var VictoryGem = function(x, y) {
    this.x = x;
    this.y = y;
}

var victoryGemX, victoryGemY;
VictoryGem.prototype.update = function() {
    victoryGemX = this.x;
    victoryGemY = this.y;

    if((-Math.abs(victoryGemY)) == playerY && this.x == playerX) {
        console.log('must say points and one gem');
        allGems.push(new Gem(victoryGemX, victoryGemY));
        playerPoints += 100; // player points increase 100 points with a gem
        player.reset();
    }
    else if (allGems.length == 5) {
        console.log("You win Game");
        winner();
    }
}

// class to give player points
var Points = function(x, y, score){
    this.x = x;
    this.y = y;
    this.score = `Your points: ${playerPoints}`;
}

Points.prototype.render = function(){
    ctx.font = '20px serif';
    ctx.fillText(this.score, this.x, this.y);
}

Points.prototype.update = function(){
    this.score = `Your points: ${playerPoints}`;
}

// arrange Enemy location randomly
// possible X-axis positions on board
var columns = [ -5, -100, -200, -300, -400];
var enemyX;

// possible Y-axis positions on board
var rows = [ 60, 140, 220];
var enemyY;

var enemySpeed;

// All enemies are placed in an array
var allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
var enemyLocation = [63, 147, 230];

// For each enemy located on the y axis from 0 on the x axis move at a speed of 200
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// The starting location of the player is located at x=200, y=405
var player = new Player(202, 405);

var allLives = [ new Lives(10, 540), new Lives(40, 540), new Lives(70, 540), new Lives(100, 540), new Lives(130, 540)];

var allGems = [];

// instantiate winning blocks
var victoryGems = [ new VictoryGem(-2, -10), new VictoryGem(100, -10), new VictoryGem(202, -10), new VictoryGem(304, -10), new VictoryGem(404, -10)];

var points = new Points(350, 570)


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
