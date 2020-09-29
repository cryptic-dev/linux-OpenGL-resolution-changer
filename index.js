const hook = require("iohook");
const { exec } = require("child_process");

function getMonitor() {
  return new Promise((resolve, reject) => {
    exec("xrandr --listmonitors", (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        const monitor = stdout.split("+*").pop().split(" ")[0];
        resolve(monitor);
      }
    });
  });
}

function getResolution() {
  return new Promise((resolve, reject) => {
    exec("xrandr", (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        const resolution = stdout.split("current ").pop().split(",")[0];
        resolve(resolution);
      }
    });
  });
}

async function changeRes() {
  const monitor = await getMonitor();
  const currentResolution = await getResolution();
  if (currentResolution == "1920 x 1080") {
    exec(`xrandr --output ${monitor} --mode 800x600 -r 75`, (err, stderr) => {
      if (err || stderr) {
        console.log(err || stderr);
      } else {
        console.log("resolution changed to 800x600");
      }
    });
  } else {
    exec(`xrandr --output ${monitor} --mode 1920x1080 -r 60`, (err, stderr) => {
      if (err || stderr) {
        console.log(err || stderr);
      } else {
        console.log("resolution changed to 1920x1080");
      }
    });
  }
}

//listen to key strokes and fire the changeRes() function
hook.on("keypress", (event) => {
  //if super + D is pressed
  if (event.rawcode == 100 && event.metaKey) {
    changeRes();
  }
  //or alt + tab is pressed
  else if (event.rawcode == 65289 && event.altKey) {
    changeRes();
  }
});

hook.start();
