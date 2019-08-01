var actions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(790, 400, Phaser.AUTO, "game", actions);
var score = -2;
var labelScore;
var labelheart;
var heart = 100;
var player;
var pipes = [];
var pipeInterval = 1.5;
function preload() {
  game.load.image("playerImg","../assets/flappy-cropped.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipe","../assets/pipe_orange.png");
  game.load.image("pipeEnd","../assets/pipe-end.png");
  game.load.image("pipe2","../assets/pipe_orange.png");
  game.load.image("pipeEnd2","../assets/pipe-end.png");
}
function create() {
  game.stage.setBackgroundColor("#00FFFF");
  labelScore = game.add.text(20, 20, "-2", {font: "60px Arial", fill: "#000000"});
  labelheart = game.add.text(20, 80, "100", {font: "60px Arial", fill: "#ff0000"});
  player = game.add.sprite(80, 200, "playerImg");
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = 1000;
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
  player.anchor.setTo(0.5, 0.5);
  game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);
}

function update() {
  game.physics.arcade.overlap(player,pipes,changeheart);
  player.rotation = Math.atan(player.body.velocity.y / 500);
    if (heart <= 0){
    gameOver();
  }
  if (player.y<=0-30 || player.y>=400){
    changeheart();
  }

}

function addPipeBlock(x, y) {
  var block = game.add.sprite(x,y,"pipe");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;
  var block2 = game.add.sprite(x,y,"pipe2");
  pipes.push(block2);
  game.physics.arcade.enable(block2);
  block2.body.velocity.x = -600;
}

var gapMargin = 40;
var height = 400;
var width = 790;
var blockHeight = 50;
var block2Height = 50;
var pipeEndExtraWidth = 10;
var pipeEndHeight = 25;
var pipeEnd2ExtraWidth = 10;
var pipeEnd2Height = 25;
var gapSize = 150;
function generatePipe() {
  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart);
    for(var y = gapStart; y > 0; y -= blockHeight) {
      addPipeBlock(width, y - blockHeight);
    }
    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
   for(var y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
     addPipeBlock(width, y);
   }
    changeScore();
    changeheart2();
  }

function addPipeEnd(x,y){
  var block = game.add.sprite(x,y,"pipeEnd");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;
  var block2 = game.add.sprite(x,y,"pipeEnd2");
  pipes.push(block2);
  game.physics.arcade.enable(block2);
  block2.body.velocity.x = -600;
}

function playerJump() {
  player.body.velocity.y = -300;
  game.sound.play("score");
}

function changeScore() {
  score++;
  labelScore.setText(score.toString());
}

function changeheart2() {
  heart++;
  labelheart.setText(heart.toString());
}

function changeheart() {
  heart = heart - 1;
  labelheart.setText(heart.toString());
}

function gameOver() {
  alert("You lost,try again!Your score is:"+score);
  location.reload()
}
