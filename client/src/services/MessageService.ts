import { AppState } from "../../AppState";
import type {
  DirectMessagesRecord,
  MessagesRecord,
  MessagesResponse,
  UsersResponse} from "../../PocketBaseTypes/pocketbase-types";
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

  async sendDirectMessage(data: DirectMessagesRecord){}

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
  async getMessagesByChannelId(id: string, page = AppState.page) {
    console.log('running');
    
    const res = await pb
    .collection(Collections.Messages)
    .getList(page,50, {
      filter: `channel.id = "${id}"`,
      sort: "-created",
      expand: 'user'
    });
    console.log(res);
    
    const messages = res.items as unknown as MessagesResponse<UsersResponse>[]
    AppState.messages = [...messages,...AppState.messages]
    AppState.totalPages = res.totalPages
    AppState.page++

  }
}

export const messageService = new MessageService();