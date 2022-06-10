
// toioと接続する
let cube = null;
let cubeX = null;
let cubeY = null;
let cubeAngle = null;
const connectCube = async () => {
  console.log("connecting...");
  cube = await new toio.scanner.NearestScanner().start();
  
  try {
    await cube.connect();
    console.log("connected!");
  }catch(error) {
    console.log("connecting error:", error);
  }

  const connectBtnElem = document.querySelector("#connect");
  connectBtnElem.remove();

  cube.on("id:position-id", info => {
    cubeX = info.x;
    cubeY = info.y;
    cubeAngle = info.angle;
  });
  cube.on('id:position-id-missed', () => {
    cubeX = null;
    cubeY = null;
  });

  start = true;
  detectionId = false;
  setRoom();
  viewCubeObj();
  createBtns();
  detectionId = true;
}

// toioを動かす
let speed = 0;
let cubeMoveAngleStatus = false;
const moveCubeAngle = async () => {
  cubeMoveAngleStatus = true;

  // 目的地の方向を向く。
  // if(cubeAngle >= 0 && cubeAngle <= 180) {
  //   await cube.move(speed, speed*-1, 0);
  // }else {
  //   await cube.move(speed*-1, speed, 0);
  // }
}

let cubeMoveStatus = false;
const moveCube = async () => {
  cubeMoveStatus = true;
  // 目的地まで移動
  speed = 50;
  await cube.move(speed, speed, 0);
}

let detectionId = true;
const detectionCube = async () => {
  detectionId = false;
  cubeObjX = cubeX;
  cubeObjY = cubeY;
  viewCubeObj();
  detectionId = true;
}
