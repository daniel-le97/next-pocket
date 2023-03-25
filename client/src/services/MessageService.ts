/* eslint-disable @typescript-eslint/no-misused-promises */
// /* eslint-disable @typescript-eslint/no-misused-promises */
import type { Record } from "pocketbase";
import { addItemOrReplace } from "utils/Functions";
import { AppState } from "../../AppState";
import type {
  DirectMessagesRecord,
  DirectMessagesResponse,
  MessagesRecord,
  MessagesResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import type { MessageWithUser } from "../../PocketBaseTypes/utils";
import { pb } from "../../utils/pocketBase";

class MessageService {
  /**
   * Sends a new message to a channel
   * @param data - The message data to send
   * @returns The newly created message
   */
  async sendMessage(data: MessagesRecord) {
    console.log(data);

    const res = await pb
      .collection(Collections.Messages)
      .create<MessageWithUser>(data, { expand: "user" });

    // AppState.messages = [res, ...AppState.messages];
    addItemOrReplace(AppState.messages, res, "id");
  }

  async sendDirectMessage(data: DirectMessagesRecord) {
    // const isUser = pb.authStore.model?.id == data.from;
    // if (!isUser) throw new Error("data.from is not the currentUser");
    const res = await pb
      .collection(Collections.DirectMessages)
      .create<DirectMessagesResponse>(data);
    // AppState.directMessages = [...AppState.directMessages, res];
    addItemOrReplace(AppState.directMessages, res, "id");
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
    const res = await pb.collection(Collections.Messages).getList(page, 50, {
      filter: `channel.id = "${id}"`,
      sort: "-created",
      expand: "user,likes(message).user",
    });

    const messages = res.items as unknown as MessageWithUser[];
    console.log(messages);

    // console.log(messages.map(message => message.expand["likes(message)"]));
    AppState.messages = [...AppState.messages, ...messages];
    AppState.totalPages = res.totalPages;
    AppState.page++;
  }

  async filterSubscribe() {
    const subscribe = await pb
      .collection(Collections.Messages)
      .subscribe("*", async({ action, record }) =>{
          if (action != "Delete") {
            const message = await this.getById(record.id);
            addItemOrReplace(AppState.messages, message, "id");
            }
          if (action == "Delete") {
            await this.deleteMessage(record.id, true)
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
  async deleteMessage(id: string, skipCall = false) {
    AppState.messages = AppState.messages.filter((m) => m.id != id);
    if (skipCall == false) {
      await pb.collection(Collections.Messages).delete(id);
    }
  }
  async editMessage(id: string, data: MessagesRecord) {
    // const res = await pb.collection(Collections.Messages).getOne(id);

    const updatedRes = await pb
      .collection(Collections.Messages)
      .update<MessageWithUser>(id, data, {
        expand: "user,likes(message)",
      });
    AppState.messages = AppState.messages.map((m) =>
      m.id === id ? updatedRes : m
    );
  }
}

export const messageService = new MessageService();
