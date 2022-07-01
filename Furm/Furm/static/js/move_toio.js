
// toioと接続
let cube = null;
const connectCube = async () => {
  console.log("conecting...");
  cube = await new toio.scanner.NearestScanner().start();

  try {
    await cube.connect();
    console.log("connected!");
  }catch(error) {
    console.log("connecting error:", error);
  }
}