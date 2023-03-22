/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process")
const {config} = require("dotenv")



// Load environment variables from .env file
module.exports = () => {
  config()
  const email = process.env.EMAIL
  const pass = process.env.PASS
  const url = process.env.NEXT_PUBLIC_POCKET_URL
  console.log(email,pass,url);
  const command = `npx pocketbase-typegen --url ${url} --email ${email} --password '${pass}' --out PocketBaseTypes/pocketbase-types.ts`;

  execSync(command, {stdio: 'inherit'})
}
module.exports()