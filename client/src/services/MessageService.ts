/* eslint-disable react-hooks/rules-of-hooks */
// import type pocketbase from "pocketbase";
import { AppState } from "../../AppState";
import { pb } from "../../utils/pocketBase";
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
     const res = await pb
       .collection("messages")
       .getList(1,50 , {
        filter:`room = "${AppState?.activeRoom}"`,
         sort: "created",
         expand:'user'
       });
    // const newMessages =  messages.map(message => new Message(message))
    AppState.messages = res.items
  
    
     
    } catch (error) {
      
    }
  }
}
export const messageService = new MessageService();
