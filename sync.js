const path = require("path");

const gaze = require("gaze");
const shell = require("shelljs");
const config = require("./sync.json");

const projectPath = process.argv[2]; //需要制定项目路径，因为需要把代码同步到指定的项目路径中

if (!projectPath) throw new Error("Project path is required! ");

const destPath = path.resolve(projectPath, config.destPath);

const command = `rsync -avz --exclude=.git --exclude=node_modules ${config.sourcePath} ${destPath}`;

gaze("src/**/*.*", (err, watcher) => {
  watcher.on("changed", filepath => {
    shell.exec(command);
    console.log(filepath + " has changed and the code has synced!");
  });
  console.log("Code syncing now...");
});
