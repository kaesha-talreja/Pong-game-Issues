var userPaddle, computerPaddle, computerScore, playerScore, gameState, ball,scoreSound, wall_hitSound, hitSound;

var user1Img,user2Img,ballImg,bgImg; 

function preload(){
   scoreSound = loadSound('score.mp3');
   wall_hitSound = loadSound('wall_hit.mp3');
   hitSound = loadSound('hit.mp3'); 
  
  //soccer
   user1Img=loadImage("boy.png");
   user2Img=loadImage("robot.png");
   ballImg=loadImage("soccer_ball.png");
   bgImg=loadImage("soccer bg.png");
  
  //table tennis
   // user1Img=loadImage("racket.png");
   // user2Img=loadImage("racket2.png");
   // ballImg=loadImage("ball.png");
   // bgImg=loadImage("background.png");
  
  //space theme
   // user1Img=loadImage("spaceship_paddle.png");
   // user2Img=loadImage("spaceship_paddle.png");
   // ballImg=loadImage("fireball.png");
   // bgImg=loadImage("space bg.jpeg");
}

function setup() {
  
createCanvas(400,400);

//create a user paddle sprite
  userPaddle = createSprite(370,200,10,70);
  userPaddle.addImage(user1Img);
 

//create a computer paddle sprite
  computerPaddle = createSprite(30,200,10,70);
  computerPaddle.addImage(user2Img);


//create the pong ball
  ball = createSprite(200,200,12,12);
  ball.addImage(ballImg);
  //scale for soccer 
  ball.scale=0.5
  
  //scale for space theme
  // userPaddle.scale=0.3
  // computerPaddle.scale=0.3
  // ball.scale=0.08
  
  //scale for table tennis
  // userPaddle.scale=0.3
  // computerPaddle.scale=0.3
  // ball.scale=0.08

  computerScore = 0;
  playerScore = 0;
  gameState = "serve";
}

function draw() {  
  //fill the computer screen with white color
  background("white");
  background(bgImg);
  edges = createEdgeSprites();
  //display Scores
  fill("yellow")
  text(computerScore,170,20);
  text(playerScore, 230,20);

  //draw dotted lines
  for (var i = 0; i < 400; i+=20) {
     stroke("white")
     line(200,i,200,i+10);
     noStroke();
  }

  if (gameState === "serve") {
    fill("yellow");
    text("Press Space to Serve",150,160);
  }

  if (gameState === "over") {
    text("Game Over!",170,140);
    text("Press 'R' to Restart",150,160);
  }

  if (keyDown("r")) {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }


  //give velocity to the ball when the user presses play
  //assign random velocities later for fun
  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "play";
  }

  //make the userPaddle move with the mouse
  userPaddle.y = World.mouseY;

  //make the ball bounce off the user paddle
  if(ball.isTouching(userPaddle)){
    hitSound.play();
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }

  //make the ball bounce off the computer paddle
  if(ball.isTouching(computerPaddle)){
    hitSound.play();
    ball.x = ball.x + 5;
    ball.velocityX = -ball.velocityX;
  }

  //place the ball back in the centre if it crosses the screen
  if(ball.x > 400 || ball.x < 0){
    scoreSound.play();

  if (ball.x < 0) {
      playerScore++;
    }
    else {
      computerScore++;
    }

    //ball.x = 200;
    //ball.y = 200;
    //ball.velocityX = 0;
    //ball.velocityY = 0;
    gameState = "serve";

    if (computerScore=== 5 || playerScore === 5){
      gameState = "over";
    }
  }

  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
    wall_hitSound.play();
  }

  //add AI to the computer paddle so that it always hits the ball
  computerPaddle.y = ball.y;
  drawSprites();
}
