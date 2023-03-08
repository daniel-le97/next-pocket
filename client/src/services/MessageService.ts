/* eslint-disable react-hooks/rules-of-hooks */
// import type pocketbase from "pocketbase";
import { AppState } from "../../AppState";
import { Collections, MessagesRecord, MessagesResponse } from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";
import type { Message } from "../models/Message";

class MessageService {
  //
  async sendMessage(data: MessagesRecord) {
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

      const res = await pb
        .collection(Collections.Messages)
        .getList<MessagesResponse>(1, 50, {
          filter: `channel = "${AppState?.activeChannel?.id}"`,
          sort: "created",
          expand: "user",
        });

      // console.log(res);

      // const newMessages = res.items.map((message) =>  (message));
      AppState.messages = res.items;
      // console.log(AppState.messages);
      
    } catch (error) {}
  }
  async getMessagesByChannelId(id: string) {
    try {
      const messages = await pb
        .collection(Collections.Messages)
        .getFullList<MessagesResponse>(200, {
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
