// utility script to upload schema to pocketbase
const { config } = require("dotenv");
const PocketBase = require("pocketbase/cjs");
const schema = require('../../pocketbase/pb_schema.json')
module.exports = async() => {
  try {
    config()
    const email = process.env.POCKET_EMAIL
    const password = process.env.POCKET_PASS
    const url = process.env.NEXT_PUBLIC_POCKET_URL
    if(!email || !password) return console.log('no email or password')
    const pb = new PocketBase(url)
    // console.log(pb);
    const user = await pb.admins.authWithPassword(email, password)
    const schemaUpload = await pb.collections.import(schema,false)
    await pb.authStore.clear()
    console.log('schema uploaded: ' + `${schemaUpload}` )
    } catch (error) {
     console.log(error, 'there was a problem uploading the schema')
    }
}
module.exports()
