
const { execSync } = require("child_process");
const { config } = require("dotenv");

// this function is just used to generate the pocketbase client types by running npm run pb:gen in the command line
module.exports = () => {
  config();
  const email = process.env.POCKET_EMAIL;
  const pass = process.env.POCKET_PASS;
  const url = process.env.NEXT_PUBLIC_POCKET_URL;
  const running = `nix pocketbase-typegen --url ${url} --email ${email} --password '${pass}'`;
  console.log(`running: ${running}`);
  const command = `${running} --out PocketBaseTypes/pocketbase-types.ts`;

  execSync(command, { stdio: "inherit" });
};
module.exports();
