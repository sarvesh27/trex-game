var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudimg,cloudsgroup,cactus1,cactus2,cactus3,cactus4,cactus5,cactus6,cactusgroup,rand,score,gameState,gameOver,restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimg=loadImage("cloud.png");
  cactus1=loadImage("obstacle1.png");
  cactus2=loadImage("obstacle2.png");
  cactus3=loadImage("obstacle3.png");
  cactus4=loadImage("obstacle4.png");
  cactus5=loadImage("obstacle5.png");
  cactus6=loadImage("obstacle6.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  
  groundImage = loadImage("ground2.png")
}

function setup() {
  createCanvas(700, 200);
  
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  trex.addAnimation("trexcollided",trex_collided);
  
  gameOver=createSprite(350,100,10,10);
  gameOver.addImage("label",gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart=createSprite(350,120,10,10);
  restart.addImage("label",restartImg);
  restart.scale=0.5;
  restart.visible=false;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  cloudsgroup=new Group();
  cactusgroup=new Group();
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score=0;
gameState="PLAY";
}

function draw() {
  background("white");
  
  console.log(trex.y);
  
  
    if(gameState === "PLAY"){
      
    //move the ground
      
    ground.velocityX = -(6+3*score/100);
      score=score+Math.round(getFrameRate()/60);
      ground.velocityX = -5;
      
        
    //adding sound everytime the score is a multiple of hundred
   // if (count%100===0 && count>0) {
     // playSound("checkPoint.mp3");
    //}
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
     //jump when the space key is pressed
   if(keyDown("space") && trex.y >= 359){
    trex.velocityY = -12;
      //playSound("jump.mp3", false);
      
    }
  
    //add gravity
   
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(cactusgroup.isTouching(trex)){
      gameState = "END";
     // playSound("die.mp3", false);
      
      
     
      
    }
  }
  
  else if(gameState === "END") {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    cactusgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    
    trex.changeAnimation(trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    cactusgroup.setLifetimeEach(-1);
     cloudsroup.setLifetimeEach(-1);
    

  restart.visible=true;
    gameOver.visible=true;
    
      if (mousePressedOver(restart)) {
    reset();
    }
    
  }
  

 
  
  trex.collide(invisibleGround);
  text("SCORE"+score,600,40);
  drawSprites();
}


function spawnClouds(){
  if (frameCount % 60===0){
      var clouds=createSprite(720,100,10,10);
       clouds.addImage(cloudimg);
    clouds.y=Math.round((random(60,100)));
    clouds.velocityX=-4;
    clouds.scale=0.5;
    clouds.lifetime=180;
    clouds.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudsgroup.add(clouds);
      }
  
  
}




function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(720,160,10,40);
    obstacle.velocityX = ground.velocityX;
  
  var rand=Math.round(random(1,6));
    switch(rand){
      case 1 :
        obstacle.addImage(cactus1);
       break; 
         case 2 :
        obstacle.addImage(cactus2);
       break; 
         case 3 :
        obstacle.addImage(cactus3);
       break; 
         case 4 :
        obstacle.addImage(cactus4);
       break; 
         case 5:
        obstacle.addImage(cactus5);
       break; 
         case 6 :
        obstacle.addImage(cactus6);
       break; 
            
       default:break;
    } 
        
    obstacle.scale = 0.5;
    obstacle.lifetime = 144;
    cactusgroup.add(obstacle);
  }
}



function reset(){
 gameState="PLAY";
 gameOver.visible=false;
 restart.visible=false;
  cactusgroup.destroyEach();
  cloudsgroup.destroyEach();
  trex.changeAnimation(trex_running);
  score=0;
  
  
  
  
}
  