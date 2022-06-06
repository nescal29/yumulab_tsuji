
/* toioと接続する */
const connectCube = () => {
  console.log("conecting...");
  const options = {
    filters: [
      {namePrefix: 'toio Core Cube-'}
    ]
  };

  navigator.bluetooth.requestDevice(options).then(device => {
    console.log("Get devices!", device);
    return device.gatt.connect();
  }).then(() => {
    console.log("Connected!");
  }).catch(error => {
    console.log(error);
  });
}
