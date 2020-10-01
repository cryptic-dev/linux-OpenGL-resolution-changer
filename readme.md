## why?

If you play games or run fullscreen openGL software on linux in a different resolution than the native one, you find your self forced to use openGl's resolution when you are in desktop which can be frustrating if your games are on a lower resolution.

## how it works:

- Node and npm must be installed
- Clone the repo
  `git clone https://github.com/cryptic-jsdev/linux-OpenGL-resolution-changer`
- Navigate into the project's directory
  `cd linux-OpenGL-resolution-changer`
- Install the rquired dependencies using npm
  `npm install`
- Run the script with the arguments --res1 and --res2 to toggle between the two resolutions, example:
  `node index --res1 1920x1080 --res2 1280x720`
