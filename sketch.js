var gameState=0
var score=0
var life=3


function preload(){
 bg=loadImage("bg.jpg")
 rocketimg=loadImage("rocket.png")
 playimg=loadImage("play.png")
 bulletimg=loadImage("bullet.png")
 e1=loadImage("e1.png")
 e2=loadImage("e2.png")
 e3=loadImage("e3.png")
 shoot=loadSound("shoot.mp3")
 destroy=loadSound("destroy.mp3")
 gameover=loadSound("gameover.mp3")
 
 

}

function setup(){
createCanvas(1520,700)
 
  play=createSprite(760,400,20,20)
  play.addImage(playimg)
  play.scale=0.3
  
  rocket=createSprite(70,350,20,20)
  rocket.addImage(rocketimg)
  rocket.scale=1.5
  
  bulletGroup=createGroup()
  e1Group=createGroup()
  e2Group=createGroup()
  e3Group=createGroup()

}

function draw(){
background(bg)
 if (gameState===0){
  play.visible=true
  rocket.visible=false
  fill("white")
  textAlign(CENTER)
  fontFamily=("Forte")
  textSize(90)
  text("SPACE BLASTER",760,200)
  if (mousePressedOver(play)){
    gameState=1
  }
 }

  if (gameState===1){
    play.visible=false
    rocket.visible=true
    if (keyDown("UP_ARROW")){
      rocket.y-=5
    }
    if (keyDown("DOWN_ARROW")){
      rocket.y+=5
    }
    enemy1()
    enemy2()
    enemy3()
   
    if (keyDown("Space")&&frameCount%15===0){
      bullet()
      shoot.play()
    }
    for(i=0;i<bulletGroup.length;i++){
      for(j=0;j<e1Group.length;j++){
        if (bulletGroup[i].isTouching(e1Group[j])){
          destroy.play()
          bulletGroup[i].destroy()
          e1Group[j].destroy()
          score+=10
        }
      }
    }
    for(i=0;i<bulletGroup.length;i++){
      for(j=0;j<e2Group.length;j++){
        if (bulletGroup[i].isTouching(e2Group[j])){
          destroy.play()
          bulletGroup[i].destroy()
          e2Group[j].destroy()
          score+=20
        }
      }
    }
    for(i=0;i<bulletGroup.length;i++){
      for(j=0;j<e3Group.length;j++){
        if (bulletGroup[i].isTouching(e3Group[j])){
          destroy.play()
          bulletGroup[i].destroy()
          e3Group[j].destroy()
          score+=35
        }
      }
    }
    
      for(j=0;j<e3Group.length;j++){
        if (rocket.isTouching(e3Group[j])){
          
          e3Group[j].destroy()
          life-=1
        
      }
    }
    for(j=0;j<e2Group.length;j++){
      if (rocket.isTouching(e2Group[j])){
        
        e2Group[j].destroy()
        life-=1
      
    }
  }
  for(j=0;j<e1Group.length;j++){
    if (rocket.isTouching(e1Group[j])){
      
      e1Group[j].destroy()
      life-=1
    
  }
}
if (life===0){
  gameover.play()
  gameState=2
}
    fill("yellow")
    textAlign(CENTER)
    strokeWeight(4)
    textSize(25)
    text("SCORE:"+score,100,50)
    text("LIFE:"+life,width-100,50)
    
  }
 
if (gameState===2){
  play.visible=false
  rocket.visible=false
  fill("white")
    textAlign(CENTER)
    strokeWeight(6)
    textSize(50)
    text("GAME OVER",width/2,height/2)
    e1Group.destroyEach()
    e2Group.destroyEach()
    e3Group.destroyEach()
}
 

  drawSprites()
}
function enemy1(){
  if (frameCount%200===0){
    enemy=createSprite(1500,random(50,650))
    enemy.addImage(e1)
    enemy.velocityX=-4
    enemy.scale=0.2
    e1Group.add(enemy)
  }
}
function enemy2(){
  if (frameCount%200===0){
    enemy=createSprite(1800,random(50,650))
    enemy.addImage(e2)
    enemy.velocityX=-4
    enemy.scale=0.3
    e2Group.add(enemy)
  }
}
function enemy3(){
  if (frameCount%200===0){
    enemy=createSprite(2100,random(50,650))
    enemy.addImage(e3)
    enemy.velocityX=-4
    enemy.scale=0.2
    e3Group.add(enemy)
  }
}
function bullet(){
  b=createSprite(rocket.x+150,rocket.y+50,20,20)
  b.addImage(bulletimg)
  b.velocityX=5
  b.scale=0.2
  bulletGroup.add(b)
}