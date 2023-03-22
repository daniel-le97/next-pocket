/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process")
const {config} = require("dotenv")

// this function is just used to generate the pocketbase client types by running npm run gen in the command line
module.exports = () => {
  config()
  const email = process.env.POCKET_EMAIL
  const pass = process.env.POCKET_PASS
  const url = process.env.NEXT_PUBLIC_POCKET_URL
  console.log(
    `running: npx pocketbase-typegen --url ${url} --email ${email} --password '${pass}'`
  );
  const command = `npx pocketbase-typegen --url ${url} --email ${email} --password '${pass}' --out PocketBaseTypes/pocketbase-types.ts`;

  execSync(command, {stdio: 'inherit'})
}
module.exports()