
const roomX = 25;
const roomY = 100;
const roomW = 250;
const roomH = 250;
const floorNum = 4;
let roomEX = 525;
let roomEY = 600;
function setup() {
  createCanvas(600, 1200);
  background(200);

  connectBtn = createButton("connect to cube");
  connectBtn.position(0, 0);
  connectBtn.mousePressed(connectCube);

  setRoom();
}

const cubeW = 25;
const cubeH = 25;
let cubeX = 0;
let cubeY = 0;
let cube;
function draw() {
  if(mouseIsPressed) {
    if((mouseX >= roomX && mouseX <= roomEX-cubeW) && (mouseY >= roomY && mouseY <= roomEY-cubeH)){
      cubeX = mouseX;
      cubeY = mouseY;
      background(200);
      setRoom();
      fill(255);
      rect(cubeX, cubeY, cubeW, cubeH);
    }
  }
}

const setRoom = () => {
  let x = roomX;
  let y = roomY;

  for(let i=0; i<floorNum; i++) {
    switch(i) {
      case 0:
        break;

      case 2:
        x = roomX;
        y += roomH;
        break;
      
      default:
        x += roomW;
    }
    rect(x, y, roomW, roomH);
  }
}

const getCubeLocation = () => {
  let x = 0;
  let y = 0;

  return;
}