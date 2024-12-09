//keeps the starting time at two minutes
let startTime;

function setup() {
  createCanvas(400, 400);
  startTime = millis(); 
}

function draw() {
  background("blue");
  drawSand(); 
  drawRock(); 
  
  displayTimer(); 
  drawCrosshair(); 
}

//sand
function drawSand() {
  fill("beige"); 
  rect(0, height - 40, width, 40); 
}

//rock
function drawRock() {
  fill("lightgray"); 

 
  beginShape();
  vertex(250, height - 40); 
  vertex(280, height - 60); // Slightly higher point of the rock
  vertex(320, height - 60); // Another higher point of the rock
  vertex(350, height - 40); // Bottom right corner of the rock
  vertex(340, height - 30); // Some irregularity on the right side
  vertex(270, height - 30); // Some irregularity on the left side
  endShape(CLOSE);
  
  fill("lightblue");
  ellipse(70, 300, 20, 20);
  ellipse(10, 340, 40, 40);
  ellipse(15, 100, 10, 10);
  ellipse(30, 60, 27, 27);
  ellipse(300, 30, 27, 27);
  ellipse(315, 50, 14, 14);
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

// mouse crosshair
function drawCrosshair() {
  let crosshairSize = 20;
  
 
  stroke("red");
  strokeWeight(2);

  // horizontal line 
  line(mouseX - crosshairSize, mouseY, mouseX + crosshairSize, mouseY);

  // vertical line
  line(mouseX, mouseY - crosshairSize, mouseX, mouseY + crosshairSize);

  // makes sure the whole canvas wont be hilighted red
  noStroke();
}
