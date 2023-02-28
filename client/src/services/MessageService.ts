/* eslint-disable react-hooks/rules-of-hooks */
// import type pocketbase from "pocketbase";
import { AppState } from "../../AppState";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";
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
      // console.log(AppState.activeChannel);

      //  const test = await pb.collection('channels').getOne(AppState.activeChannel ,{
      //   expand:'messages'
      //  })

      //  console.log(test);

      const res = await pb.collection("messages").getList(1, 50, {
        filter: `channel = "${AppState?.activeChannel?.id}"`,
        sort: "created",
        expand: "user",
      });

      // const newMessages =  messages.map(message => new Message(message))
      AppState.messages = res.items;
    } catch (error) {}
  }
  async getMessagesByChannelId(id: string) {
    try {
      const messages = await pb
        .collection("messages")
        .getFullList<Message>(200, {
          filter: `channel.id = ${id}`,
          sort: "-created",
        });
      return messages;
    } catch (error) {
      Pop.error(error);
    }
  }
}
export const messageService = new MessageService();
