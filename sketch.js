var electrofast, electrofastRunImg, electrofastStandRightImg, electrofastStandLeftImg ,electrofastJumpImg, electrofastRunLeftImg
var electrofastLastDirection = "right"
var gadgetack, gadgetackRunImg, gadgetackStandRightImg, gadgetackStandLeftImg ,gadgetackJumpImg, gadgetackRunLeftImg
var gadgetackLastDirection = "right"
var ground, platformImg, leftWall, rightWall, wallImg, middlePlatform
var lightning, lightningImg, lightningGroup
var lightningTimeout = 0
var greenlightning, greenlightningImg, greenLightningGroup
var greenlightningTimeout = 0
var drones, dronesImg, dronesGroup
var bomb, bombImg
var gameOver = false
var p1score = 0
var p2score = 0
//var lives = 3
var edges
var gameSpeed
var timeMarker = 0
var winner
var coolDownE = 10
var coolDownG = 10

function preload() {
  // This creates electrofast's in-game animations. It's pretty long!
  electrofastRunImg = loadAnimation("Images/electrofast1_jumpRight.svg", "Images/electrofast2Right.svg",
  "Images/electrofast3Right.svg", "Images/electrofast4Right.svg","Images/electrofast1_jumpRight.svg","Images/electrofast2Right.svg",
  "Images/electrofast4Right.svg")
  electrofastRunLeftImg = loadAnimation("Images/electrofast4Left.svg", "Images/electrofast3Left.svg", "Images/electrofast2Left.svg",
  "Images/electrofast1_jumpLeft.svg", "Images/electrofast4Left.svg","Images/electrofast3Left.svg","Images/electrofast2Left.svg")
  electrofastStandRightImg=loadImage('Images/electrofast5_standRight.svg')
  electrofastStandLeftImg=loadImage('Images/electrofast5_standLeft.svg')
  electrofastJumpImg=loadImage('Images/electrofast1_jumpLeft.svg')

  // This creates gadgetack's in-game animations. It's pretty long!
  gadgetackRunImg = loadAnimation("Images/gadgetack_jumpRight.svg", "Images/gadgetack2Right.svg",
  "Images/gadgetack3Right.svg", "Images/gadgetack4Right.svg","Images/gadgetack_jumpRight.svg","Images/gadgetack2Right.svg",
  "Images/gadgetack4Right.svg")
  gadgetackRunLeftImg = loadAnimation("Images/gadgetack4Left.svg", "Images/gadgetack3Left.svg", "Images/gadgetack2Left.svg",
  "Images/gadgetack_jumpLeft.svg", "Images/gadgetack4Left.svg","Images/gadgetack3Left.svg","Images/gadgetack2Left.svg")
  gadgetackStandRightImg=loadImage('Images/gadgetack5_standRight.svg')
  gadgetackStandLeftImg=loadImage('Images/gadgetack5_standLeft.svg')
  gadgetackJumpImg=loadImage('Images/gadgetack_jumpLeft.svg')

  // The platforms images:
  platformImg = loadImage("Images/Ground_Platform.png")
  wallImg = loadImage("Images/Walls.png")

  //Image for the gimmicks:
  dronesImg=loadImage('Images/Drone.png')
  bombImg=loadImage('Images/Golden Bomb.png')
  lightningImg=loadImage('Images/lightning.png')
  greenlightningImg=loadImage("Images/greenlightning.png")
}

function setup() {
  createCanvas(1400, 700)
  edges = createEdgeSprites()

  // The code below forms electrofast's size, picture and animation.
  electrofast = createSprite(750,50,20,20)
  electrofast.addImage('standright',electrofastStandRightImg)
  electrofast.addImage('standleft',electrofastStandLeftImg)
  electrofast.addAnimation("run",electrofastRunImg)
  electrofast.addImage('Boing!!!',electrofastJumpImg)
  electrofast.addAnimation('left',electrofastRunLeftImg)
  electrofast.scale = 0.32

  gadgetack = createSprite(650,500,20,20)
  gadgetack.addImage('standright',gadgetackStandRightImg)
  gadgetack.addImage('standleft',gadgetackStandLeftImg)
  gadgetack.addAnimation("run",gadgetackRunImg)
  gadgetack.addImage('Boing!!!',gadgetackJumpImg)
  gadgetack.addAnimation('left',gadgetackRunLeftImg)
  gadgetack.scale = 0.32

  // The walls and the platforms electrofast stands on:
  ground = createSprite(700, 670)
  ground.addImage(platformImg)
  ground.scale = 1.5

  leftWall = createSprite(30, 350)
  leftWall.addImage(wallImg)

  rightWall = createSprite(1370, 350)
  rightWall.addImage(wallImg)

  middlePlatform = createSprite(700, 430)
  middlePlatform.addImage(platformImg)
  middlePlatform.scale =0.5

  //Groups for the gimmicks:
  dronesGroup=createGroup()
  lightningGroup=createGroup()
  greenLightningGroup=createGroup()
  bombGroup=createGroup()

  //THE BOMB😱😱😱:
  /*bomb=createSprite(140,550)
  bomb.addImage(bombImg)
  bomb.scale=0.5
  bomb.setCollider("circle",0,27,78)
  bombGroup.add(bomb)*/
}

function draw() { 
  background("cyan")

  if(!gameOver){
    gameSpeed=1+((p1score+p2score)/10)

    drawSprites()

    // Displays the score and lives.
    textSize(30)
    stroke("red")
    strokeWeight(7)
    text("Get the other player!!!", 250,30)

    /*textSize(30)
    stroke("green")
    strokeWeight(7)
    text("P2 Score: "+p2score, 550,30)*/

    //stroke("green")
    //text("Lives: "+lives, 10,30)

    // Subtracts lives where necessary.
    /*if(electrofast.isTouching(dronesGroup)||gadgetack.isTouching(dronesGroup)) {
      lives--
    }*/

    // These functions control some of the game's fundementals, such as controls, the drones and the lightning bolts.
    electrofastControlsAndPhysics()
    gadgetackControlsAndPhysics()
    //buildDrones()
    //lightningControl()
    //createBombs()

    //console.log("timeMarker: ",timeMarker," time left: ",frameCount-timeMarker)

    /*if(frameCount-timeMarker>130/gameSpeed){
      gameOver=true
    }*/

    // This checks if the game has ended.
    if(greenLightningGroup.isTouching(electrofast)){
      winner = "gadgetack"
      gameOver=true
    }

    if(lightningGroup.isTouching(gadgetack)){
      winner = "electrofast"
      gameOver=true
    }

  } else {
    // This displays the game-over message.
    background("red")

    strokeWeight(20)
    textSize(70)
    if(winner=="electrofast"){
      stroke("blue")
      text("ElectroFast wins!", width/2-500, height/2-200)
    } else {
      stroke("lime")
      text("Gadgetack wins!", width/2-500, height/2-200)
    }
    stroke("orange")
    text("Press space to play again!", width/2-500, height/2+200)
    if(keyDown("SPACE")) {
      gameOver = false
      p1score = 0
      p2score = 0
      lightningGroup.destroyEach()
      greenLightningGroup.destroyEach()
      electrofast.x = 750
      electrofast.y = 50
      gadgetack.x = 650
      gadgetack.y = 500
    }
  }
}

// This controls electrofast's movement, jumping, falling and animation changes.
function electrofastControlsAndPhysics(){
  electrofast.velocityY+=1
  electrofast.collide(ground)
  electrofast.collide(middlePlatform)
  // Jumping on the middle platform.
  if(keyDown("UP_ARROW")&&electrofast.y>380&&electrofast.y<385&&electrofast.x>400&&electrofast.x<1100) {
    electrofast.velocityY=-20
  }

 // Jumping on the bottom platform.
  if(keyDown("UP_ARROW")&&electrofast.y>580&&electrofast.y<585) {
  electrofast.velocityY=-20
  }

  if(keyDown("RIGHT_ARROW")&&!electrofast.isTouching(rightWall)&&!electrofast.isTouching(middlePlatform)) {
    electrofast.x+=10*gameSpeed
    electrofast.changeAnimation('run')
    electrofastLastDirection = "right"
  }

  if(keyDown("LEFT_ARROW")&&!electrofast.isTouching(leftWall)&&!electrofast.isTouching(middlePlatform)) {
    electrofast.x-=10*gameSpeed
    electrofast.changeAnimation('left')
    electrofastLastDirection = "left"
  }

  if(!keyDown("RIGHT_ARROW")&&!keyDown("LEFT_ARROW")) {
    if(electrofastLastDirection=="right"){
      electrofast.changeImage("standright")
    } else {
      electrofast.changeAnimation("standleft")
    }
  }

  if(keyDown("SPACE")&&coolDownE>10){
    coolDownE = 0
    electrofastlightning()
  }
  coolDownE++
}

// This controls gadgetack's movement, jumping, falling and animation changes.
function gadgetackControlsAndPhysics(){
  gadgetack.velocityY+=1
  gadgetack.collide(ground)
  gadgetack.collide(middlePlatform)

  // Jumping on the middle platform.
  if(keyDown("W")&&gadgetack.y>380&&gadgetack.y<385&&gadgetack.x>400&&gadgetack.x<1100) {
    gadgetack.velocityY=-20
  }

 // Jumping on the bottom platform.
  if(keyDown("w")&&gadgetack.y>580&&gadgetack.y<585) {
  gadgetack.velocityY=-20
  }

  if(keyDown("D")&&!gadgetack.isTouching(rightWall)&&!gadgetack.isTouching(middlePlatform)) {
    gadgetack.x+=10*gameSpeed
    gadgetack.changeAnimation('run')
    gadgetackLastDirection = "right"
  }

  if(keyDown("A")&&!gadgetack.isTouching(leftWall)&&!gadgetack.isTouching(middlePlatform)) {
    gadgetack.x-=10*gameSpeed
    gadgetack.changeAnimation('left')
    gadgetackLastDirection = "left"
  }

  if(!keyDown("D")&&!keyDown("A")) {
    if(gadgetackLastDirection=="right"){
      gadgetack.changeImage("standright")
    } else {
      gadgetack.changeAnimation("standleft")
    }
  }

  if((keyDown("Q")||keyDown("E"))&&coolDownG>10){
    coolDownG = 0
    gadgetacklightning()
  }
  coolDownG++
}

// This creates the drones.
function buildDrones(){
  if(frameCount%70==0){
    drones=createSprite(random(350,width),30,)
    drones.addImage(dronesImg)
    drones.scale=0.17
    drones.velocityX=-7
    drones.velocityY=+7
    //drones.setCollider("rectangle",0,0,400,300)
    dronesGroup.add(drones)
    } 

    dronesGroup.bounceOff(leftWall)
    dronesGroup.bounceOff(rightWall)
    dronesGroup.bounceOff(ground)
    dronesGroup.bounceOff(middlePlatform)
    dronesGroup.bounceOff(edges)

    if(dronesGroup.isTouching(lightningGroup)){
      dronesGroup[0].destroy()
      score++
    }

    if(dronesGroup.isTouching(bomb)){
      dronesGroup[0].destroy()
    }

    if(dronesGroup.isTouching(electrofast)){
      dronesGroup[0].destroy()
    }
}

function gadgetacklightning() {
  greenlightning = createSprite(gadgetack.x,gadgetack.y)
  greenlightning.addImage(greenlightningImg)
  greenlightning.lifetime = 50
  greenlightning.scale = 0.5
  if(gadgetackLastDirection=="right") {
    greenlightning.velocityX = 12
  } else {
    greenlightning.velocityX = -12
  }
  greenLightningGroup.add(greenlightning)
}

function electrofastlightning() {
  lightning = createSprite(electrofast.x,electrofast.y)
  lightning.addImage(lightningImg)
  lightning.lifetime = 50
  lightning.scale = 0.5
  if(electrofastLastDirection=="right") {
    lightning.velocityX = 12
  } else {
    lightning.velocityX = -12
  }
  lightningGroup.add(lightning)
}

/*function createBombs() {
  if(bombGroup.isTouching(electrofast)){
    console.log("success")
    p1score++
    bombGroup[0].destroy()
    bomb=createSprite(random(350,width-100),random(550,0))
    bomb.addImage(bombImg)
    bomb.scale=0.5
    bomb.setCollider("circle",0,27,78)
    bombGroup.add(bomb)
    timeMarker = frameCount
  }

  if(bombGroup.isTouching(gadgetack)){
    console.log("success")
    p2score++
    bombGroup[0].destroy()
    bomb=createSprite(random(350,width-100),random(550,0))
    bomb.addImage(bombImg)
    bomb.scale=0.5
    bomb.setCollider("circle",0,27,78)
    bombGroup.add(bomb)
    timeMarker = frameCount
  }
}*/