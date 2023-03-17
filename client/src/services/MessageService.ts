import { AppState } from "../../AppState";
import type {
  MessagesRecord,
  MessagesResponse} from "../../PocketBaseTypes/pocketbase-types";
import {
  Collections
} from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";
import type { Message } from "../models/Message";

class MessageService {
  /**
   * Sends a new message to a channel
   * @param data - The message data to send
   * @returns The newly created message
   */
  async sendMessage(data: MessagesRecord){
      
  }

  /**
   * Gets the list of messages for the current active channel
   */
  async getMessages(): Promise<void> {
    if (!AppState.activeChannel) {
      // No active channel selected, don't do anything
      return;
    }

    
 
    
    const res = await pb
      .collection(Collections.Messages)
      .getList<MessagesResponse>(1, 50, {
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
  async getMessagesByChannelId(id: string) {
    const res = await pb.collection(Collections.Messages).getFullList<
      MessagesResponse
    >(200, {
      filter: `channel.id = ${id}`,
      sort: "-created",
    });
    const messages = res.items as MessagesResponse[]
    return messages.items;
  }
}

export const messageService = new MessageService();