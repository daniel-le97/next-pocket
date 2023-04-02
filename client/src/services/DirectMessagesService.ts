import { AppState } from "AppState";
import type {
  DirectMessagesRecord,
  DirectMessagesResponse,
  DirectMessageWithUser,
} from "PocketBaseTypes";
import { Collections } from "PocketBaseTypes";
import { logger } from "utils/Logger";
import { pb } from "utils/pocketBase";

interface DirectMessage {
  from: string;
  to: string;
  files: string[];
  message: string;
}

class DirectMessageService {
  /**
   * Creates a new direct message.
   * @param message - The direct message to create.
   * @returns The newly created direct message object.
   */
  async createDirectMessage(message: DirectMessagesRecord) {
    const res = await pb
      .collection(Collections.DirectMessages)
      .create<DirectMessagesResponse>(message);
    return res;
  }

  /**
   * Updates an existing direct message with the specified ID.
   * @param id - The ID of the direct message to update.
   * @param message - The updated direct message object.
   * @returns The updated direct message object.
   */
  async updateDirectMessage(id: string, message: DirectMessagesRecord) {
    const res = await pb
      .collection(Collections.DirectMessages)
      .update<DirectMessage>(id, message);
    return res;
  }

  /**
   * Deletes an existing direct message with the specified ID.
   * @param id - The ID of the direct message to delete.
   * @returns The deleted direct message object.
   */
  async deleteDirectMessage(id: string) {
    const res = await pb.collection(Collections.DirectMessages).delete(id);
    return res;
  }
  /**
   * Gets the list of messages for a specific friend
   * @param friendId - The ID of the channel to get messages for
   * @param page - which page to fetch from the list
   * @returns The list of messages for the specified channel
   */
  async getDirectMessages(friendId: string, page = AppState.page) {
    const userId = AppState.user?.id;
    if (!userId) {
      logger.error('please log in or refresh the page')
      return
    }
    const res = await pb
      .collection(Collections.DirectMessages)
      .getList(page, 50, {
        filter: `from = "${userId}"  && to = "${friendId}" ||  from = "${friendId}"  && to = "${userId}" `,
        sort: "-created",
        expand: "from"
      });
      const messages = res.items as unknown as DirectMessageWithUser[];
      // console.log('messages', messages);
      const nID = friendId as unknown as number;
      const numbers = AppState.directMessages.filter(dm => dm.to != friendId && dm.from != friendId) || [];
    AppState.directMessages = [...numbers, ...messages];

    AppState.totalPages = res.totalPages;
    AppState.page++;
  }
}

export const directMessageService = new DirectMessageService();
