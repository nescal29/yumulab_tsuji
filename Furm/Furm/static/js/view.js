// let start = false;

// const roomX = 45;
// const roomY = 45;
// const roomW = 410;
// const roomH = 410;
// const floorNum = 1;
// let roomEX = roomX + roomW;
// let roomEY = roomY + roomH;
// function setup() {
//   createCanvas(500, 500);
//   background(220);

//   noStroke();
//   textAlign(CENTER, CENTER);
//   const connectBtn = createButton("connect to cube");
//   connectBtn.id("connect");
//   connectBtn.position(width/2-connectBtn.width/2, height/2);
//   connectBtn.mousePressed(connectCube);
// }

// function draw() {
//   if(mouseIsPressed && start) {
//     viewCubeObj();
//   }

//   if(cubeMoveAngleStatus) {
//     if(cubeAngle >= relAngle-5 && cubeAngle <= relAngle) {
//       console.log("cubeMoveAngle stop:", cubeAngle);
//       cubeMoveAngleStatus = false;
//       moveCube();
//     }
//   }

//   if(cubeMoveStatus) {
//     if((cubeX >= cubeObjX-100 && cubeX <= cubeObjX+100) && (cubeY >= cubeObjY-100 && cubeY <= cubeObjY+100)) {
//       console.log("cubeMove stop\ncubeX:", cubeX, "cubeY:", cubeY, "\ncubeObjX:", cubeObjX, "cubeObjY:", cubeObjY);
//       cubeMoveStatus = false;
//       cube.stop();
//     }
//   }
// }

// const setRoom = () => {
//   fill(255);
//   stroke(150);
//   let x = roomX;
//   let y = roomY;

//   for(let i=0; i<floorNum; i++) {
//     switch(i) {
//       case 0:
//         break;

//       case 2:
//         x = roomX;
//         y += roomH;
//         break;

//       default:
//         x += roomW;
//     }
//     rect(x, y, roomW, roomH);
//   }
// }

// const createBtns = () => {
//   const moveStartBtn = createButton("MOVE");
//   moveStartBtn.id("move");
//   moveStartBtn.mousePressed(moveCubeAngle);
//   moveStartBtn.position(roomEX-50, roomEY+15);

//   const detectionBtn = createButton("DETECTION");
//   detectionBtn.id("detection");
//   detectionBtn.mousePressed(detectionCube);
//   detectionBtn.position(roomEX-150, roomEY+15);
// }

// const cubeObjW = 31.8;
// const cubeObjH = 31.8;
// let cubeObjX = roomX;
// let cubeObjY = roomY;
// const viewCubeObj = () => {
//   const cubeObjR = 255;
//   const cubeObjG = 142;
//   const cubeObjB = 60;

//   if(detectionId && (mouseX >= roomX && mouseX <= roomEX-cubeObjW) && (mouseY >= roomY && mouseY <= roomEY-cubeObjH)){
//     cubeObjX = mouseX;
//     cubeObjY = mouseY;
//   }

//   background(220);
//   setRoom();
//   fill(cubeObjR, cubeObjG, cubeObjB);
//   noStroke();
//   rect(cubeObjX, cubeObjY, cubeObjW, cubeObjH);
// }

let canvas;
let magElem;
let widthElem;
let heightElem;
let matNumElem;
function setup() {
  const viewCanvasElem = document.getElementById("view-canvas");
  canvas = createCanvas(displayWidth-20, displayWidth-20);
  canvas.id("mat-view-canvas");
  canvas.parent(viewCanvasElem);
  background("#FFFFFF");

  const div = createDiv();
  div.id("mag-content");
  div.parent(viewCanvasElem);

  const input = createInput(100, "number");
  input.id("mag");
  input.attribute("min", "0");
  input.attribute("max", "150");
  input.parent(div);

  magElem = document.getElementById("mag");
  widthElem = document.querySelector("input[name='width']");
  
  const elem = createSpan("%");
  elem.id("mag-unit");
  elem.parent(div);
}

let magNum;
let widthNum;
let heightNum;
function draw() {
  magNum = magElem.value;
  widthNum = widthElem.value;
  heightNum = widthElem.value;

  /* マットを出力 */
  background("#FFFFFF");
  fill("#C4C4C4");
  rect(
    (canvas.width / 2) - (widthNum * magNum / 100) / 2,
    (canvas.height / 2) - (heightNum * magNum / 100) / 2,
    widthNum * magNum / 100,
    heightNum * magNum / 100
  );
}

function createMat() {
  
}