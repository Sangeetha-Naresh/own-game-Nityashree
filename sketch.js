 var bg ,prince,princerunning,cryingprincess,ob1;
 var princess;
 var demon,drunning,wizard,wizardImg;
 var arrowGroup,obstaclesGroup;
 var flag=0;
 var end,endImg,endbg;
 var gameState="start"
 
 function preload()
{
 bg=loadImage("images/path.png")
  cryingprincess=loadAnimation("images/psad.png")
  ob1=loadImage("images/ob1.png")
  princerunning=loadAnimation("images/prun11.png")//,"images/prun2.png")
  drunning=loadAnimation("images/d3-a.png","images/d3-b.png","images/d3-c.png")
  endImg=loadImage("images/a.jpg")
  endbg=loadImage("images/end2.jpg")
  wizardImg=loadImage("images/d2.png") 
}

function setup() 
{
  createCanvas(1300, 600);

bgsprite=createSprite(650,300);
bgsprite.velocityX=-2
bgsprite.addImage(bg)
bgsprite.visible=false

princess=createSprite(1200,500)
princess.addAnimation("crying",cryingprincess)
princess.scale=0.2
princess.visible=false

prince=createSprite(100,550)
prince.addAnimation("running",princerunning)
prince.visible=false

demon=createSprite(1100,500)
demon.addAnimation("running",drunning)
demon.scale=0.5
demon.velocityY=-8
demon.visible=false

wall1=createSprite(1100,50,200,20)
wall1.visible=false

wall2=createSprite(1100,575,200,20)
wall2.visible=false

ground=createSprite(100,575,200,20)
ground.visible=false

//end=createSprite(1200,500,50,50)
//end.addImage("endImg",endImg)
//end.visible=false
//end.scale=1


arrowGroup=new Group();
obstaclesGroup=new Group();

wizard=createSprite(900,300)
wizard.addImage("wizard",wizardImg)
wizard.visible=false

}

function draw() 
{

  background(0);

  if(gameState==="start"){
    wizard.visible=true
    drawSprites();
    text("Welcome to game",500,100)
    text("press S to start game and save the princess",500,200)
  
   if(keyDown("s")){
     gameState="play"
   }
  }
 
  if(gameState==="play"){
    bgsprite.visible=true
    prince.visible=true
    princess.visible=true
    demon.visible=true
    wizard.destroy();
  if(bgsprite.x<320){
    bgsprite.x=650
  }

  spawnob();

  if(keyDown("space")){
    prince.velocityY=-12
  }

prince.velocityY=prince.velocityY+0.5

if(keyWentDown("right")){
  shootarrow()
}

prince.collide(ground)

demon.bounceOff(wall1)
demon.bounceOff(wall2)

for(var i=0; i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(arrowGroup)){
    obstaclesGroup.get(i).destroy()
    arrowGroup.destroyEach()
  }
}

drawSprites();

if(arrowGroup.isTouching(demon)){
  demon.destroy()
  arrowGroup.destroyEach();
  flag=1;
}

if(obstaclesGroup.isTouching(prince)){
  prince.destroy();
  flag=2
}

if(flag===1){
  background(0)
  bgsprite.destroy();
  prince.destroy();
  princess.destroy();
  end=createSprite(250,300)
  end.addImage("end",endImg)
  end.scale=0.5
  drawSprites();
  textSize(50)
  fill("red")
  text("Game Over",700,200)
  text("You won the game",700,400) 
obstaclesGroup.destroyEach();
}

if(flag===2){
  background(0)
  bgsprite.destroy();
  princess.destroy();
  end2=createSprite(250,300)
  end2.addImage("end",endbg)
  end2.scale=0.5
  drawSprites();
  textSize(50)
  fill("red")
  text("Game Over",700,200)
  text("You lost the game",700,400) 
obstaclesGroup.destroyEach();
}
  }
}

function spawnob(){
if(frameCount % 120===0){
    obs=createSprite(1000,500)
    obs.addImage(ob1)
    obs.velocityX=-5
    obs.scale=0.2
    obstaclesGroup.add(obs)

  }
}

function shootarrow(){
  var arrow=createSprite(100,prince.y,50,5)
  arrow.velocityX=6
  arrowGroup.add(arrow)
}