let maxDepth = 9;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
}

function draw() {
  background(240);

  translate(width / 2, height); // Start from bottom center
  drawBranch(120, maxDepth);
}

function drawBranch(len, depth) {
  // Thickness decreases
  let thickness = map(depth, 0, maxDepth, 1, 12);
  strokeWeight(thickness);

  // Color transition: brown → green
  let r = map(depth, 0, maxDepth, 34, 139);
  let g = map(depth, 0, maxDepth, 139, 69);
  let b = map(depth, 0, maxDepth, 34, 19);
  stroke(r, g, b);

  line(0, 0, 0, -len);
  translate(0, -len);

  if (depth > 0) {
    // Animated angle using sin(millis())
    let angle = 20 + sin(millis() * 0.002) * 15;

    push();
    rotate(angle);
    drawBranch(len * 0.7, depth - 1);
    pop();

    push();
    rotate(-angle);
    drawBranch(len * 0.7, depth - 1);
    pop();
  }
}