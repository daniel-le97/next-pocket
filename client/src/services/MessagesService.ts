/* eslint-disable @typescript-eslint/no-misused-promises */
// /* eslint-disable @typescript-eslint/no-misused-promises */
import { AppState } from "AppState";
import type { Record } from "pocketbase";
import type {
  DirectMessagesRecord,
  DirectMessagesResponse,
  MessagesRecord,
  MessageWithUser,
} from "PocketBaseTypes";
import { Collections } from "PocketBaseTypes";
import { addItemOrReplace, addItemOrReplaceV2, filterStateArray} from "utils/Functions";
import { pb } from "utils/pocketBase";

class MessageService {
  /**
   * Sends a new message to a channel
   * @param data - The message data to send
   * @returns The newly created message
   */
  async sendMessage(data: MessagesRecord) {
    // console.log(data);

    await pb
      .collection(Collections.Messages)
      .create<MessageWithUser>(data, { expand: "user" });
    // if (res.id) {
    //   addItemOrReplaceV2('messages', res, "id");
    // }
  }

  async sendDirectMessage(data: DirectMessagesRecord) {
    // const isUser = pb.authStore.model?.id == data.from;
    // if (!isUser) throw new Error("data.from is not the currentUser");
    await pb
      .collection(Collections.DirectMessages)
      .create<DirectMessagesResponse>(data);
    // AppState.directMessages = [...AppState.directMessages, res];
    // addItemOrReplaceV2('directMessages', res, "id");
  }

  /**
   * Gets the list of messages for the current active channel
   */
  async getMessages() {
    if (!AppState.activeChannel) {
      // No active channel selected, don't do anything
      throw new Error("unable to find channelId");
    }
    const res = await pb
      .collection(Collections.Messages)
      .getList<MessageWithUser>(1, 50, {
        filter: `channel = "${AppState.activeChannel.id}"`,
        sort: "-created",
        expand: "user,reactions(messageId)",
      });
    console.log("messages", res);

    AppState.messages = res.items;
  }

  /**
   * Gets the list of messages for a specific channel
   * @param id - The ID of the channel to get messages for
   * @returns The list of messages for the specified channel
   */
  async getMessagesByChannelId(id: string, page = AppState.page) {
    AppState.messages = [];
    const res = await pb.collection(Collections.Messages).getList(page, 25, {
      filter: `channel.id = "${id}"`,
      sort: "-created",
      expand: "user,likes(message).user",
    });

   

    const messages = res.items as unknown as MessageWithUser[];
    messages.map(message =>{
      if(!message.expand["likes(message)"]){
        message.expand["likes(message)"] = []
      }
    })
    // console.log(messages);

    // console.log(messages.map(message => message.expand["likes(message)"]));
    AppState.messages = [...AppState.messages, ...messages];
    AppState.totalPages = res.totalPages;
  
  }

  async subscribe() {
    const subscribe = await pb
      .collection(Collections.Messages)
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          console.log(action);
          
          const message = await this.getById(record.id);
          addItemOrReplaceV2('messages', message, "id");
        }
        if (action === "delete") {
          filterStateArray('messages', record, 'id')
        }
      });
    return subscribe;
  }

  async getById(id: string) {
    const res = await pb
      .collection(Collections.Messages)
      .getOne<MessageWithUser>(id, { expand: "user,likes(message)" });
    return res;
    // console.log(res);
  }
  async deleteMessage(id: string) {
    await pb.collection(Collections.Messages).delete(id);
  }
  async editMessage(id: string, data: MessagesRecord) {
    await pb
      .collection(Collections.Messages)
      .update<MessageWithUser>(id, data, {
        expand: "user,likes(message)",
      });
  }
}

export const messageService = new MessageService();
