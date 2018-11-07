function setup() {
  createCanvas(500, 600);
  strokeWeight(1.75);
}

function draw() {
  background(220);
  push();
  noFill();
  translate(20, 50);

  makeLine();
  pop();
  noLoop();
}

//function to create a scribble
//draws a sine wave that is determined by randomly selected amplitude and angle
function makeLine() {
  let amplitude = [];
  let theta = [];
  let totalTime = 0;

  //select a random number of random amplitude and angle values
  let length = int(random(5, 22));
  for (let i = 0; i < length; i++) {
    amplitude.push(random(1, 20));
    theta.push(random(0, 2 * PI));
  }

  //begin drawing the line
  beginShape();
  for (let i = 0; i < length; i++) {
    //how long to plot this sine wave
    let time = int(random(1, 20));
    //shift over to next sine wave
    totalTime = totalTime + time;
    //plot the since wave
    for (let j = 0; j < time; j += 4) {
      curveVertex(totalTime + j, amplitude[i] * sin(theta[i]));
    }
  }
  endShape();
}

//switch it up when you click the mouse
function mousePressed() {
  draw();
}
