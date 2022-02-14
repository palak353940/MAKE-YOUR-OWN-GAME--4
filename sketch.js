var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie;
var zombieG,bulletG;
var zombieImg;
var rand;
var bulletSound,bullet;
var zombieKilled = 0;

var heart1Img,heart2Img,heart3Img;
var hearts;
var hit = 0;
var gameover,gameoverImg;
var victory,victoryImg;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  shooter2 = loadImage("assets/shooter_1.png")
 zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

  bulletSound = loadSound("assets/explosion.mp3");

  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");

  gameoverImg = loadImage("assets/gameover.jpg");
  victoryImg = loadImage("assets/victory.jpg");
  
 
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombieG = new Group();
   bulletG = new Group();

   hearts = createSprite(150,50,20,20)
   hearts.addImage(heart3Img)
   hearts.scale = 0.4;

   gameover = createSprite(displayWidth/2-10,displayHeight/2-10,10,10);
   gameover.addImage(gameoverImg)
   gameover.scale = 0.5;
   gameover.visible = false;

   victory = createSprite(displayWidth/2-10,displayHeight/2-10,10,10);
   victory.addImage(victoryImg)
   victory.scale = 2.0;
   victory.visible = false;
    
}
 


function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  bullets();

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  zombieG.add(zombie)
  bulletG.add(bullet)


}

if(zombieG.isTouching(player)){

  zombieG.destroyEach();
  hearts.addImage(heart2Img);
  hit = hit+1
}
if (hit === 2){
  hearts.addImage(heart1Img);
}
if (hit===3){
  hearts.visible = false;
  player.destroy();
  zombieG.destroyEach();
  gameover.visible = true;
}

if(bulletG.isTouching(zombieG)){

    bulletG.destroyEach()
    zombieG.destroyEach()
    zombieKilled = zombieKilled+1
}
 
if(zombieKilled === 10){
  victory.visible = true;
  zombie.velocityX = 0;
  player.addImage(shooter2)
}





drawSprites();

if(zombieKilled < 10){
textSize(24)
fill("blue")
text('Your goal is to kill 10 zombies,GOOD LUCK!!',350,50)
spawnZombie();
}
}
function spawnZombie(){
 
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
   
   
    zombie.lifetime = 400
   zombieG.add(zombie)
  }

 }





function bullets(){

  bullet = createSprite(player.x,player.y,10,10);
  bullet.velocityX = 10
  bullet.shapeColor = "yellow"
  bulletSound.play();
  bulletG.add(bullet)
}