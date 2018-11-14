//GLOBAL VARIABLES
let text = [];
let compText;
let lines;
let words;
let letters;
let linesFrac = 0.20;
let wordsFrac = 0.50;
let lettersFrac = 0.30;


function preload() {
  text = loadStrings('txtmsg_ai.txt');
}


function setup() {
  let myPoem = document.getElementById('myPoem');
  console.log(myPoem);
  noCanvas();
  //use my text to array class to parse through text file
  compText = new TextToArray(text);
  lines = compText.makeLineArray();
  for (let i = 0; i < lines.length * linesFrac; i++) {
    let eachP = document.createElement('p');
    myPoem.appendChild(eachP);
    eachP.innerHTML = lines[i];
    eachP.style.position = 'absolute';
    // eachP.style.left = i * 10 + "px";
    eachP.style.top = i * 20 + "px";
  }
  words = compText.makeWordArray();
  console.log(words);
  for (let i = floor(words.length * linesFrac); i < words.length * wordsFrac; i++) {
    let eachP = document.createElement('p');
    myPoem.appendChild(eachP);
    eachP.innerHTML = words[i];
    eachP.style.position = 'absolute';
    eachP.style.left = random(40, 100) + "px";
    eachP.style.top = 20 * lines.length * linesFrac + random(0, 5) * i + "px";

  }

}


function draw() {
  //don't loop
  noLoop();
}
