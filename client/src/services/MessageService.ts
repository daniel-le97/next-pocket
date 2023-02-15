/* eslint-disable react-hooks/rules-of-hooks */
// import type pocketbase from "pocketbase";
import { pb } from "../../util/pocketBase";
import type { Message } from "../models/Message";

class MessageService {
  //
  async sendMessage(data: Message) {
    try {
      const res = await pb.collection("messages").create<Message>(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async getMessages() {
    try {
      const messages = await pb.collection('messages').getFullList(200,{})
    // const newMessages =  messages.map(message => new Message(message))
      return messages
    } catch (error) {
      
    }
  }
}
export const messageService = new MessageService();
