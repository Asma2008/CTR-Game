//cut the rope game

//Declare variables for game objects and behaviour indicators(FLAGS)
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Constraint = Matter.Constraint;

const Bodies = Matter.Bodies; //creates different shaped bodies
const Body = Matter.Body; //will help control and modify any property of any body, one at a time

/* `const Composites = Matter.Composites;` and `const Composite = Matter.Composite;` are declaring
variables that store references to the `Composites` and `Composite` modules of the Matter.js physics
engine library. These modules provide functions for creating and manipulating composite bodies,
which are collections of multiple bodies that can be treated as a single entity in the physics
simulation. These variables are later used in the code to create composite bodies for attaching the
ropes and fruit together. */
const Composites = Matter.Composites;
const Composite = Matter.Composite;

//Declaring(creating) variables for simulation of physics engine
let amEngine;
let amWorld;

var fruit, fruitIMG;
var bunny, bunnyIMG;
var ground, groundIMG;

var muteBTN, airBlowBTN;
var cutBTN1, cutBTN2, cutBTN3;
var muteIMG, cutIMG, airIMG;

var rope1, rope2, rope3;
var fruit_con1, fruit_con2, fruit_con3;

var blinkingAnimation, eatingAnimation, cryingAnimation;
var bkgSound, sadSound, cutSound, eatingSound, airSound;

var star1, star2, starIMG;
var starCounterDisplay, zeroStarCounter, oneStarCounter, twoStarCounter;

var bubble1, bubble2, bubbleIMG;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
  //  . - exiting that file or folder
  //  / - entering the file or folder which is named after the slashed
  fruitIMG = loadImage("./assets/images/melon.png");
  bunnyIMG = loadImage("./assets/images/Rabbit-01.png");
  groundIMG = loadImage("./assets/images/background.png");

  starIMG = loadImage("./assets/images/star.png");
  zeroStarCounter = loadAnimation("./assets/images/empty.png");
  oneStarCounter = loadAnimation("./assets/images/one_star.png");
  twoStarCounter = loadAnimation("./assets/images/two_stars.png");

  bubbleIMG = loadImage("./assets/images/bubble.png");

  // adding sound / loading sound files
  bkgSound = loadSound("./assets/sounds/sound1.mp3");
  sadSound = loadSound("./assets/sounds/sad.wav");
  cutSound = loadSound("./assets/sounds/rope_cut.mp3");
  eatingSound = loadSound("./assets/sounds/eating_sound.mp3");
  airSound = loadSound("./assets/sounds/air.wav");

  blinkingAnimation = loadAnimation(
    "./assets/images/blink_1.png",
    "./assets/images/blink_2.png",
    "./assets/images/blink_3.png"
  );
  eatingAnimation = loadAnimation(
    "./assets/images/eat_0.png",
    "./assets/images/eat_1.png",
    "./assets/images/eat_2.png",
    "./assets/images/eat_3.png",
    "./assets/images/eat_4.png"
  );
  cryingAnimation = loadAnimation(
    "./assets/images/sad_1.png",
    "./assets/images/sad_2.png",
    "./assets/images/sad_3.png"
  );

  blinkingAnimation.playing = true;
  eatingAnimation.playing = true;
  cryingAnimation.playing = true;

  cryingAnimation.looping = false;
  eatingAnimation.looping = false;
}

//define the intial environment of the software(before it is used)
//by defining the declared variables with default values
//executed only once at the start of the program
function setup() {
  createCanvas(500, 700);
  frameRate(80);

  //creating our very own engine
  amEngine = Engine.create();
  //extracting world from the newly created engine
  amWorld = amEngine.world;

  //creating object of class ground
  ground = new Ground(200, 680, 600, 20);

  //creating rope objects
  //ropeOBJ = new Rope(no. of rectangles, attached point to ceiling/wall)
  //no. of rectangles = length of rope
  //attached point = x and y position to start the rope from
  rope1 = new Rope(5, { x: 245, y: 30 });
  rope2 = new Rope(6, { x: 397, y: 298 });
  rope3 = new Rope(6, { x: 98, y: 368 });
  //creating fruit body
  fruit = Bodies.circle(300, 300, 20);
  //creating a composite to attach rope and fruit bodies together
  Matter.Composite.add(rope1.body, fruit);

  //creating a link between the current rope object and fruit body(like a glue dot)
  fruit_con1 = new Link(rope1, fruit);
  fruit_con2 = new Link(rope2, fruit);
  fruit_con3 = new Link(rope3, fruit);

  // creating sprite object for bunny
  bunny = createSprite(420, 620, 100, 100);
  //bunny.addImage("bunnyIMG", bunnyIMG);
  bunny.scale = 0.2;
  bunny.addAnimation("blinking", blinkingAnimation);
  bunny.addAnimation("eating", eatingAnimation);
  bunny.addAnimation("crying", cryingAnimation);
  bunny.changeAnimation("blinking");

  //adding the airblow button
  airBlowBTN = createImg("./assets/images/balloon.png");
  airBlowBTN.position(10, 250);
  airBlowBTN.size(70, 70);
  airBlowBTN.mouseClicked(airblow);

  //adding the mute button
  muteBTN = createImg("./assets/images/mute.png");
  muteBTN.position(450, 20);
  muteBTN.size(50, 50);
  muteBTN.mouseClicked(mute);

  //creating cut buttons at different positions
  cutBTN1 = createImg("./assets/images/cutbtn.png");
  cutBTN1.position(220, 30);
  cutBTN1.size(50, 50);
  //on click of first cut buttonn, drop1 function will be called
  cutBTN1.mouseClicked(drop1);

  cutBTN2 = createImg("./assets/images/cutbtn.png");
  cutBTN2.position(400, 300);
  cutBTN2.size(50, 50);
  //on click of second cut butotn, drop2 function will be called
  cutBTN2.mouseClicked(drop2);

  cutBTN3 = createImg("./assets/images/cutbtn.png");
  cutBTN3.position(100, 370);
  cutBTN3.size(50, 50);
  //on click of third cut butotn, drop1 function will be called
  cutBTN3.mouseClicked(drop3);

  //creating star display counter
  starCounterDisplay = createSprite(50, 20, 30, 30);
  starCounterDisplay.scale = 0.2;
  starCounterDisplay.addAnimation("empty", zeroStarCounter);
  starCounterDisplay.addAnimation("one", oneStarCounter);
  starCounterDisplay.addAnimation("two", twoStarCounter);
  starCounterDisplay.changeAnimation("empty");

  // 2 star sprite objects
  star1 = createSprite(350, 150, 20, 20);
  star1.addImage(starIMG);
  star1.scale = 0.02;

  star2 = createSprite(150, 230, 20, 20);
  star2.addImage(starIMG);
  star2.scale = 0.02;

  //creating bubble and placing them strategically
  bubble1 = createSprite(360, 230, 20, 20);
  bubble1.addImage(bubbleIMG);
  bubble1.scale = 0.1;

  bubble2 = createSprite(290, 460, 20, 20);
  bubble2.addImage(bubbleIMG);
  bubble2.scale = 0.1;
}

//All modifications, changes, conditions, manipulations, actions during the course of the program are written inside function draw.
//All commands to be executed and checked continously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
  background(51);

  // APPLYING IMAGE OVER BACKGROUND COLOUR
  image(groundIMG, 0, 0, 490, 690);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  //activating the engine to make the physics actually work
  Engine.update(amEngine);

  //displaying ground object
  ground.show();

  //displaying fruit body
  if (fruit != null) {
    imageMode(CENTER);
    image(fruitIMG, fruit.position.x, fruit.position.y, 70, 70);
  }
  //display rope objects
  rope1.show();
  rope2.show();
  rope3.show();

  // checking if fruit is colliding with bunny
  if (checkForCollision(fruit, bunny, 60) == true) {
    drop1();
    drop2();
    drop3();

    World.remove(amWorld, fruit);
    fruit = null;

    bubble1.visible = false;
    bubble2.visible = false;

    bunny.changeAnimation("eating");
    eatingSound.play();
  }

  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation("crying");

    bkgSound.stop();
    sadSound.play();
    
    fruit = null;
  }

  //check collision between fruit and both star sprite objects
  // if collided == true, then increase the display star counter by the number of stars collected
  if (checkForCollision(fruit, star1, 20) == true) {
    star1.visible = false;
    starCounterDisplay.changeAnimation("one");
  }

  if (checkForCollision(fruit, star2, 40) == true) {
    star2.visible = false;
    starCounterDisplay.changeAnimation("two");
  }

  //check collision between fruit and both bubble sprite objects
  // if collided == true, then move bubble and fruit together
  if (checkForCollision(fruit, bubble1, 40) == true) {
    amWorld.gravity.y = -1;
    bubble1.position.x = fruit.position.x;
    bubble1.position.y = fruit.position.y;
  }
  if (checkForCollision(fruit, bubble2, 40) == true) {
    amWorld.gravity.y = -1;
    bubble2.position.x = fruit.position.x;
    bubble2.position.y = fruit.position.y;
  }

  drawSprites();
}

function drop1() {
  rope1.break();
  fruit_con1.detach();
  fruit_con1 = null;
  cutSound.play();
}
function drop2() {
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
  cutSound.play();
}
function drop3() {
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
  cutSound.play();
}

function airblow() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.05, y: 0 });
  airSound.play();
}

function mute() {
  if (bkgSound.isPlaying()) {
    bkgSound.stop();
  } else {
    bkgSound.play();
  }
}

function checkForCollision(passedBody, passedSprite, estimatedDistance) {
  if (passedBody != null) {
    var calculatedDistance = dist(
      passedBody.position.x,
      passedBody.position.y,
      passedSprite.position.x,
      passedSprite.position.y
    );
    if (calculatedDistance <= estimatedDistance) {
      // World.remove(amWorld, fruit);
      // fruit = null;
      return true;
    } else {
      return false;
    }
  }
}
