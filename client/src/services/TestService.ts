import { pb } from "utils/pocketBase";

export async function helloS() {
  const hello = await pb.settings.getAll()
  console.log(hello);
}