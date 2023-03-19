import { AppState } from "../../AppState";
import type {
  DirectMessagesRecord,
  DirectMessagesResponse,
  MessagesRecord,
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
    const channelId = AppState.activeChannel?.id;
    if (!channelId) throw new Error("no activeChannel.id");
    const res = await pb
      .collection(Collections.Messages)
      .create<MessageWithUser>(data, { expand: "user" });

    AppState.messages = [...AppState.messages, res];
  }

  async sendDirectMessage(data: DirectMessagesRecord) {
    const isUser = pb.authStore.model?.id == data.from;
    if (!isUser) throw new Error("data.from is not the currentUser");
    const res = await pb
      .collection(Collections.DirectMessages)
      .create<DirectMessagesResponse>(data);
    AppState.directMessages = [...AppState.directMessages, res];
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
        expand: "user",
      });

    AppState.messages = res.items;
  }

  /**
   * Gets the list of messages for a specific channel
   * @param id - The ID of the channel to get messages for
   * @returns The list of messages for the specified channel
   */
  async getMessagesByChannelId(id: string, page = AppState.page) {
    const res = await pb.collection(Collections.Messages).getList(page, 13, {
      filter: `channel.id = "${id}"`,
      sort: "-created",
      expand: "user",
    });
 
    

    const messages = res.items as unknown as MessageWithUser[];
    AppState.messages = [...messages, ...AppState.messages];
    AppState.totalPages = res.totalPages;
    AppState.page++;
  }
}

export const messageService = new MessageService();
