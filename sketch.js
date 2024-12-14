let startTime;
let fish;
let score = 0;
let shooting = false;
let fishX; // x position of the fish
let fishY; // y position of the fish
let fishSpeed = 4; // Speed of the fish
let fishSize = 40
let bubbleColors = ["lightblue", "slateblue", "lightcyan", "dodgerblue","lightblue", "slateblue", "lightcyan", "blue"]; // Default bubble colors
let bubblePositions = []; 

function setup() {
 
  var canvas = createCanvas(600, 400);
  /* using parent() to place the canvas
  in the "sketch-holder div "*/
  canvas.parent('sketch-holder');
  
  
  startTime = millis();
  
  
//randomize bubbles
  for (let i = 0; i < 8; i++) {
    bubblePositions.push({ x: random(width), y: random(height, height + 100) });
  }
  //random fish position
  fish = createfish();
  
    // Initialize small fish position
  fishX = 100; // Start on the left
  fishY = random(100, 300); // Random y position for the fish
}

function draw() {
  background("blue");
  drawSand();
  drawRock();
  drawCrosshair();
  displayTimer();
  displayScore();

  //refreshes and jiggles the bubbles
  for (let i = 0; i < bubblePositions.length; i++) {
    let bubble = bubblePositions[i];
    bubble.x += random(-1, 1); 
    bubble.y -= 1; 
    // Reset to the bottom
    if (bubble.y < 0) {
      bubble.y = height + random(50, 100); 
      bubble.x = random(width); 
    }
// Draw the bubbles
stroke(50);
fill(bubbleColors[i]);
ellipse(bubble.x, bubble.y, 30, 30); // bibble size
  } 
  
//show and move fish
fish.move();
displayFish(fish);

  // Cregister click on fish
if (shooting && dist(mouseX, mouseY, fish.fishX, fish.fishY) < 45) { // Adjust radius as needed
  score += 10;  // increase score when fish click
  fish = createfish();  // Create a new fish at a random position
  shooting = false;  
}
  
}

// Create a new fish at a random position when clicked
function createfish() {
  return {
fishX: random(50, width - 50),
fishY: random(50, height - 100),
fishSize: 80,
fishSpeed: random(1, 15),
direction: random([-1, 1]),

move: function() {
this.fishX += this.fishSpeed * this.direction;

// reverse direction when fish hits screen edge
if (this.fishX < 0 || this.fishX > width) {
this.direction *= -1;
      }
    }
  }
}

// fish
function displayFish(fish) {
  fill('green');
  ellipse(fish.fishX, fish.fishY, 90, 60); // fish body
  fill('white');
  // Adjust eye position based on direction
  let eyeXOffset = fish.direction > 0 ? 5 : -5;
  ellipse(fish.fishX + eyeXOffset, fish.fishY, 30, 30); // Eye
  fill('black');
  ellipse(fish.fishX + eyeXOffset, fish.fishY, 10, 10); // Pupil
  fill('pink');
  // Adjust tail points based on direction
  let tailXOffset = fish.direction > 0 ? 45 : -45;
  triangle(fish.fishX - tailXOffset, fish.fishY, fish.fishX - tailXOffset * 2, fish.fishY - 9, fish.fishX - tailXOffset * 2, fish.fishY + 20); // Fish tail
}

// On screen timer
function displayTimer() {
let elapsedTime = millis() - startTime;
let remainingTime = max(0, 120000 - elapsedTime);
let minutes = floor(remainingTime / 60000);
let seconds = floor((remainingTime % 60000) / 1000);
let timeString = nf(minutes, 2) + ":" + nf(seconds, 2);

fill("white");
textSize(24);
text(timeString, 20, 30);
}

// Display the score
function displayScore() {
fill("white");
textSize(24);
text("Score: " + score, width - 150, 30);
}

// Mouse crosshair
function drawCrosshair() {
let crosshairSize = 20;

stroke("red");
strokeWeight(2);

// Horizontal line
line(mouseX - crosshairSize, mouseY, mouseX + crosshairSize, mouseY);

// Vertical line
line(mouseX, mouseY - crosshairSize, mouseX, mouseY + crosshairSize);

  noStroke();
}

// Sand
function drawSand() {
fill("beige");
rect(0, height - 40, width, 40);
}

// Rock
function drawRock() {
fill("lightgray");

// Rock lines
beginShape();
vertex(250, height - 40);
vertex(280, height - 60); 
vertex(320, height - 60); 
vertex(350, height - 40); 
vertex(340, height - 30); 
vertex(270, height - 30); 
endShape(CLOSE);

//still bubbles
fill("lightblue");
ellipse(70, 300, 20, 20);
ellipse(10, 340, 40, 40);
ellipse(15, 100, 10, 10);
ellipse(30, 60, 27, 27);
ellipse(300, 30, 27, 27);
ellipse(315, 50, 14, 14);
}

// Mouse clicked to shoot
function mousePressed() {
shooting = true;
}
