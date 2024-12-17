let gameState = "start"; 
let savedState = {}; // holds games save point
let isPaused = false; // knows when game is paused
let shooting = false;
let score = 0;
let startTime;
let bubbles = [];
let fish;

class Fish {
constructor() {
this.fishX = random(50, width - 50);
this.fishY = random(50, height - 100);
this.fishSize = 80;
this.fishSpeed = random(1, 20);
this.direction = random([-1, 1]);
  }

//turns fish if it hits border
move() {
this.fishX += this.fishSpeed * this.direction;
if (this.fishX < 0 || this.fishX > width) {
this.direction *= -1;
}
}

//fish
display() {
fill('green');
stroke("black");
strokeWeight(2);
ellipse(this.fishX, this.fishY, 90, 60); 
fill('white');
let eyeXOffset = this.direction > 0 ? 5 : -5;
ellipse(this.fishX + eyeXOffset, this.fishY, 30, 30); 
fill('black');
ellipse(this.fishX + eyeXOffset, this.fishY, 10, 10); 
fill('pink');
let tailXOffset = this.direction > 0 ? 45 : -45;
triangle(
this.fishX - tailXOffset, this.fishY,
this.fishX - tailXOffset * 2, this.fishY - 9,
this.fishX - tailXOffset * 2, this.fishY + 20); 
}
}

class Bubble {
constructor() {
this.x = random(width);
this.y = random(height, height + 100);
this.color = random(["lightblue", "slateblue", "lightcyan", "dodgerblue", "lightblue", "slateblue", "lightcyan", "blue"]);
}

//bubble movement
move() {
this.x += random(-1, 1);
this.y -= 1;
if (this.y < 0) {
this.y = height + random(50, 100);
this.x = random(width);
}
}

display() {
stroke("black");
strokeWeight(2);
fill(this.color);
ellipse(this.x, this.y, 30, 30); 
}
}

function setup() {
var canvas = createCanvas(600, 400);
canvas.parent('sketch-holder');
startTime = millis();
  
for (let i = 0; i < 8; i++) {
bubbles.push(new Bubble());
}
  
fish = new Fish();
}

function draw() {if (gameState === "start") {drawStartScreen();} else if (gameState === "playing") {if (isPaused) {drawPauseScreen();} else {background("blue");
drawSand();
drawRock();
drawCrosshair();
displayTimer();
displayScore();
      
      // Move and display bubbles
for (let bubble of bubbles) {
bubble.move();
bubble.display();
}

// Move and display fish
fish.move();
fish.display();

//fish clicked
if (shooting && dist(mouseX, mouseY, fish.fishX, fish.fishY) < 45) {score += 10;fish = new Fish(); //after fish is shot it respawns at ra  ndom spot
shooting = false;
      }
    }
  }
}

//timer
function displayTimer() {
let elapsedTime = millis() - startTime;
let remainingTime = max(0, 120000 - elapsedTime);
let minutes = floor(remainingTime / 60000);
let seconds = floor((remainingTime % 60000) / 1000);
let timeString = nf(minutes, 2) + ":" + nf(seconds, 2);
fill("white");
textSize(24);
text(timeString, 60, 30);
}

//score
function displayScore() {
fill("white");
textSize(24);
text("Score: " + score, width - 150, 30);
}

//crosshair
function drawCrosshair() {
let crosshairSize = 20;
stroke("red");
strokeWeight(2);
line(mouseX - crosshairSize, mouseY, mouseX + crosshairSize, mouseY);
line(mouseX, mouseY - crosshairSize, mouseX, mouseY + crosshairSize);
  
}

//sand
function drawSand() {
stroke("black");
strokeWeight(2);
fill("beige");
rect(0, height - 40, width, 40);
}

//rock
function drawRock() {
stroke("black");
strokeWeight(2);
fill("lightgray");
beginShape();
vertex(250, height - 40);
vertex(280, height - 60); 
vertex(320, height - 60); 
vertex(350, height - 40); 
vertex(340, height - 30); 
vertex(270, height - 30); 
endShape(CLOSE);

//bubbles
fill("lightblue");
stroke("black");
strokeWeight(2);
ellipse(70, 300, 20, 20);
ellipse(10, 340, 40, 40);
ellipse(15, 100, 10, 10);
ellipse(30, 60, 27, 27);
ellipse(300, 30, 27, 27);
ellipse(315, 50, 14, 14);
}

function drawStartScreen() {
background(0, 102, 204); 
fill("white");
textSize(36);
textAlign(CENTER, CENTER);
text("Welcome to Scuba SHooter!", width / 2, height / 4);
textSize(18);
text("Click anywhere to start", width / 2, height / 2);

textSize(14);
text("Shoot the fish to score points! Avoid missing!", width / 2, height * 3 / 4);
}

function drawPauseScreen() {
background(0, 102, 204); 
fill("white");
textSize(36);
textAlign(CENTER, CENTER);
text("Game Paused", width / 2, height / 4);
  
textSize(18);
text("Press SPACE to Resume", width / 2, height / 2);
}

function mousePressed() {
if (gameState === "start") {gameState = "playing"; } else if (gameState === "playing" && !isPaused) {shooting = true;}
}

function keyPressed() {if (key === ' ' && gameState === "playing") {isPaused = !isPaused;}
  
// Save game press shift
if (keyCode === SHIFT) {saveGame();
}
  
// Load game when enter is pressed
if (keyCode === ENTER) {loadGame();}
}

// Save to localStorage
function saveGame() {savedState = {score: score,fishX:fish.fishX,fishY: fish.fishY,fishSpeed: fish.fishSpeed,fishDirection: fish.direction,startTime:startTime,gameState: gameState};
localStorage.setItem("gameState", JSON.stringify(savedState));console.log("Game saved!");
}

//load game from storage
function loadGame() {const savedData = localStorage.getItem("gameState");
if (savedData) {savedState = JSON.parse(savedData);score = savedState.score;fish.fishX = savedState.fishX;fish.fishY = savedState.fishY;fish.fishSpeed = savedState.fishSpeed;fish.direction = savedState.fishDirection;startTime = savedState.startTime;gameState = savedState.gameState;console.log("Game loaded!");} else {console.log("No saved game found.");}
}
