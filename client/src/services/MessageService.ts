/* eslint-disable react-hooks/rules-of-hooks */
// import type pocketbase from "pocketbase";
import { pb, } from "../../util/pocketBase";

class MessageService {
  //
 async sendMessage() {
    const res = await pb.collection('messages').create()
    return res
  }
}
export const messageService = new MessageService();
