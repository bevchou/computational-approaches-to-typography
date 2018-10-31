//GLOBAL VARIABLES
let word = ["-", "<", "S", "N", "A", "K", "E", ">"];

let direction;
let position = [];

//start positions for snake
let snakeCol = 20;
let snakeRow = 10;

//colors
let bgColor = 40;
let fgColor = 92;

function setup() {
  //format canvas
  noCanvas();
  frameRate(2);
  //start message
  term.write('use arrow keys');
  //create an array of each character's position
  for (let i = 0; i < word.length; i++) {
    position.push({
      col: snakeCol,
      row: snakeRow
    });
    snakeCol += 2;
  }
  console.log(position);
}

function draw() {
  //draw the snake
  for (let i = 0; i < word.length; i++) {
    term.write("\x1B["+fgColor+"m");
    // term.write("\x1B["+bgColor+"m");
    term.write("\x1b[" + position[i].row + ";" + position[i].col + "H" + word[i] + " ");
  }

  //if user has input directions
  if (direction) {

    //add an object to the front of the array
    position.splice(0, 0, {
      col: position[0].col,
      row: position[0].row
    });
    //update the new position of the snake's head
    if (direction == "up") {
      position[0].row--;
    } else if (direction == "down") {
      position[0].row++;
    } else if (direction == "right") {
      position[0].col += 2;
    } else if (direction == "left") {
      position[0].col -= 2;
    }
    //splice the end, so the position of each letter slides up
    if (position.length > word.length) {
      let toDel = position.length - word.length
      position.splice(position.length - 1, toDel);
    }

  }

  // term.write("\x1b[" + startRow + ";" + startCol + "H-< S N A K E >")
  // term.write("S N A K E");
}

//get user input
$(function() {
  console.log('using jquery');
  // get arrow keypress from user
  // and then  set direction
  $(window).keydown(function(e) {
    if (e.which == 38) {
      direction = "up";
    } else if (e.which == 40) {
      direction = "down";
    } else if (e.which == 39) {
      direction = "right";
    } else if (e.which == 37) {
      direction = "left";
    }
    // console.log(direction);
    // console.log(position);
  });
});
