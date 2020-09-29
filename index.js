const hook = require("iohook");
const argv = require("yargs").argv;
const { exec } = require("child_process");

if (!argv.res1 || !argv.res2) {
  console.log("missing arguments");
  process.kill(process.pid, 2);
}

const res1 = argv.res1;
const res2 = argv.res2;

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
        const resolution = stdout
          .split("current ")
          .pop()
          .split(",")[0]
          .replace(/\s/g, "");
        resolve(resolution);
      }
    });
  });
}

async function changeRes() {
  const monitor = await getMonitor();
  const currentResolution = await getResolution();

  if (currentResolution == res1) {
    exec(`xrandr --output ${monitor} --mode ${res2}`, (err, stderr) => {
      if (err || stderr) {
        console.log(err || stderr);
      } else {
        console.log(`resolution changed to ${res2}`);
      }
    });
  } else if (currentResolution == res2) {
    exec(`xrandr --output ${monitor} --mode ${res1}`, (err, stderr) => {
      if (err || stderr) {
        console.log(err || stderr);
      } else {
        console.log(`resolution changed to ${res1}`);
      }
    });
  }
}

//listen to key strokes and fire the changeRes() function
hook.on("keypress", (event) => {
  //if super + D is pressed
  if (event.rawcode == 100 && event.metaKey) {
    changeRes().catch((e) => {
      console.log(e);
    });
  }
  //or alt + tab is pressed
  else if (event.rawcode == 65289 && event.altKey) {
    changeRes().catch((e) => {
      console.log(e);
    });
  }
});

hook.start();
