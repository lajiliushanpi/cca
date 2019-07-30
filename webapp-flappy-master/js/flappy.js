var actions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(790, 400, Phaser.AUTO, "game", actions);
var score = -2;
var labelScore;
var player;
var pipes = [];
var pipeInterval = 1.5;
function preload() {
  game.load.image("playerImg","../assets/flappy-cropped.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipe","../assets/pipe_orange.png");
}

function create() {
  game.stage.setBackgroundColor("#00FFFF");
  labelScore = game.add.text(20, 20, "-2", {font: "60px Arial", fill: "#000000"});
  player = game.add.sprite(80, 200, "playerImg");
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = 1000;
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);

  game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);
}

function update() {
  game.physics.arcade.overlap(player, pipes, gameOver);
  if (player.y<=0 || player.y>=400){
    gameOver()
  }
}

function addPipeBlock(x, y) {
  var block = game.add.sprite(x,y,"pipe");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;
}

function generatePipe() {
  var gapStart = game.rnd.integerInRange(1, 5);
  for (var count = 0; count < 8; count++) {
    if(count != gapStart && count != gapStart+1){
      addPipeBlock(750, count * 50);
    }
  }
  changeScore();
}

function playerJump() {
  player.body.velocity.y = -300;
  game.sound.play("score");
}

function changeScore() {
  score++;
  labelScore.setText(score.toString());
}
function gameOver() {
  location.reload()
}
