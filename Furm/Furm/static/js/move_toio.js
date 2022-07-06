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
let relAngle = 0;
let cubeMoveAngleStatus = false;
const moveCubeAngle = async () => {
  cubeMoveAngleStatus = true;

  const diffX = cubeObjX - cubeX;
  const diffY = cubeObjY - cubeY;

  console.log("diffX:", diffX, "diffY:", diffY);

  relAngle = Math.atan2(diffY, diffX) * 180 / Math.PI;
  relAngle = (relAngle + 360) % 360;
  console.log("cubeAngle:",cubeAngle);
  console.log("relAngle:", relAngle);

  speed = 10;
  if(relAngle < 180) {
    await cube.move(speed, speed * -1, 0);
  }else{
    await cube.move(speed * -1, speed, 0);
  }
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