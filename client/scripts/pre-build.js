const { execSync } = require("child_process");
// const { config } = require("dotenv");

// this function is just used to generate the pocketbase client types by running npm run pb:gen in the command line
module.exports = () => {

  const running = `pre-build`;
  console.log(`running: ${running}`);
  const command = `rm -rf out && rm -rf ../pocketbase/static`;

  execSync(command, { stdio: "inherit" });
};
module.exports();
