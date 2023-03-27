import { AppState } from "AppState";
import type {
  DirectMessagesRecord,
  DirectMessagesResponse,
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
  async updateDirectMessage(id: string, message: DirectMessage) {
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
   * Retrieves a single direct message with the specified ID.
   * @param data - The ID of the from and  to to retrieve.
   * @returns The retrieved direct message object.
   */
  async getDirectMessage(data: any) {
    const res = await pb
      .collection(Collections.DirectMessages)
      .getFullList(100, {
        filter: `from.id == "${data.userid}" && to.id == "${data.userid}"`,
      });
    return res;
  }

  // /**
  //  * Retrieves a list of direct messages with the specified filter and pagination options.
  //  * @param filter - The filter to apply to the direct messages list.
  //  * @param limit - The maximum number of direct messages to retrieve.
  //  * @param offset - The offset to apply to the direct messages list.
  //  * @returns The list of direct messages that match the filter and pagination options.
  //  */
  // async getDirectMessages(userId: string, friendId: string) {
  //   const res = await pb
  //     .collection(Collections.DirectMessages)
  //     .getFullList<DirectMessagesResponse>(100, {
  //       filter: `from = "${userId}"  && to = "${friendId}" ||  from = "${friendId}"  && to = "${userId}" `,
  //       expand: "from,to",
  //     });

  //   AppState.directMessages = res;
  //   const friendRes = await pb.collection(Collections.Users).getOne(friendId);
  //   AppState.activeDirectMessage = friendRes;
  //   console.log(friendRes);

  //   return res;
  // }

  /**
   * Gets the list of messages for a specific friend
   * @param friendId - The ID of the channel to get messages for
   * @param page - which page to fetch from the list
   * @returns The list of messages for the specified channel
   */
  async getDirectMessagesById(friendId: string, page = AppState.page) {
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
      });
    console.log(res);
    const messages = res.items as unknown as DirectMessagesResponse[];
    AppState.directMessages = [...AppState.directMessages, ...messages];

    AppState.totalPages = res.totalPages;
    AppState.page++;
  }
}

export const directMessageService = new DirectMessageService();
