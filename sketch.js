var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
//var invisibleRoof;
var cloud, cloudsGroup, cloudImage;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var obstaclesGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver,gameOverImg;
var restart,restartImg;

var dieSound,jumpSound,checkPointSound;

var score;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  cloudImage = loadImage("cloud.png");
  
  groundImage = loadImage("ground2.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  
}

function setup() {
createCanvas(600, 200);
  
score = 0
  
//create a trex sprite
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
//create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,182,400,05);
  //invisibleRoof = createSprite(200,40,400,05)
  
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  trex.setCollider("circle",0,0,40);
  //trex.setCollider("rectangle",0,0,400,trex.height)
 //trex.debug = true;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5
  
  restart = createSprite(300,130)
  restart.addImage(restartImg); 
  restart.scale = 0.3
  
  
  //trex.debug = true
}

function draw() {
background("white");

  //var message = "Hello! this game has been made by Soham"
  //console.log(message)

  
  console.log("This is game state: " + gameState)
  
  text("score: " + score, 250,50) 
  
  if(gameState === PLAY){
    
    ground.velocityX = -(6 + score / 100);
    
    gameOver.visible = false
    restart.visible = false
      
  
  score = score + (Math.round(getFrameRate() / 60))
    
      if (keyDown("space")&&trex.y >= 150) {
      trex.velocityY = -12.5;
      jumpSound.play();
        
    }
    
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
      
    }
  spawnObstacle();
  spawnClouds();
  
  if(obstaclesGroup.isTouching(trex)){
   gameState = END;
   dieSound.play();
  //  trex.velocityY = -12
  //jumpSound.play();
    
  }

  }
  
  if(score > 0 && score % 100 === 0){
    checkPointSound.play();
  }
  
  else if(gameState === END){
    
    gameOver.visible = true
    restart.visible = true
    
        
    trex.changeAnimation("collided",trex_collided)
    ground.velocityX = 0;
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1)

      if(mousePressedOver(restart)){
    console.log("restart the game")
    reset();
  }
    
  }
  


  
   // for(var i = 0;i<100;i++){
   // console.log("runningloop")
 // }
  
//jump when the space button is pressed

  
 // console.log("this is frame: " + frameCount)
 // console.time();
 // console.warn("WARNING");
 // console.error();
 // console.info("This is the draw function");
  //gravity;
  
  trex.collide(invisibleGround);
  invisibleGround.visible = 0
  //invisibleRoof.visible = 0
  trex.collide(obstaclesGroup);
  
  //trex.bounceOff(invisibleRoof);
  


  drawSprites();
 // console.timeEnd()
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false
  restart.visible = false
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running)
  score = 0;
  
}

function spawnObstacle(){
  if(frameCount % 100 === 0) {
  var obstacle = createSprite(650,170,10,10);
  obstacle.velocityX = -(6 + score / 100);
    
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1:
        obstacle.addImage(obstacle1);
        obstacle.scale = 0.5;
        break;
        
      case 2: 
        obstacle.addImage(obstacle2);
        obstacle.scale = 0.5;
        break;
        
      case 3:
        obstacle.addImage(obstacle3);
        obstacle.scale = 0.5;
        break;
        
      case 4: 
        obstacle.addImage(obstacle4);
        obstacle.scale = 0.5;
        break;
        
      case 5:
        obstacle.addImage(obstacle5);
        obstacle.scale = 0.5;
        break;
        
      case 6: 
        obstacle.addImage(obstacle6);
        obstacle.scale = 0.5;
        break;
        default:
        break;
    }

  obstacle.lifetime = 120
       obstaclesGroup.add(obstacle);
      //obstacle.debug = true
  }

}

function spawnClouds(){

  
  if(frameCount % 150 === 0){
  cloud = createSprite(650,50,10,10);
  cloud.velocityX = -2; 
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.y = Math.round(random(10,60));
    console.log("Trex's depth: " + trex.depth);
    console.log("Cloud's depth: " + cloud.depth);
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloud.lifetime = 350;
       cloudsGroup.add(cloud);
  }
}


