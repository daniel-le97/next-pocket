const { execSync } = require("child_process");
// const { config } = require("dotenv");

// utility script to clear directories that are about to be rewritten
module.exports = () => {

  const running = `pre-build`;
  console.log(`running: ${running}`);
  const command = `rm -rf out && rm -rf ../pocketbase/static`;

  execSync(command, { stdio: "inherit" });
};
module.exports();
