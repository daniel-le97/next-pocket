import { AppState } from "../../AppState";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";

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
  async createDirectMessage(message: DirectMessage) {
    const response = await pb
      .collection(Collections.DirectMessages)
      .create<DirectMessage>(message);
    return response;
  }

  /**
   * Updates an existing direct message with the specified ID.
   * @param id - The ID of the direct message to update.
   * @param message - The updated direct message object.
   * @returns The updated direct message object.
   */
  async updateDirectMessage(id: string, message: DirectMessage) {
    const response = await pb
      .collection(Collections.DirectMessages)
      .update<DirectMessage>(id, message);
    return response;
  }

  /**
   * Deletes an existing direct message with the specified ID.
   * @param id - The ID of the direct message to delete.
   * @returns The deleted direct message object.
   */
  async deleteDirectMessage(id: string) {
    const response = await pb.collection(Collections.DirectMessages).delete(id);
    return response;
  }

  /**
   * Retrieves a single direct message with the specified ID.
   * @param data - The ID of the from and  to to retrieve.
   * @returns The retrieved direct message object.
   */
  async getDirectMessage(data: any) {
    const response = await pb
      .collection(Collections.DirectMessages)
      .getFullList(100, {
        filter: `from.id == "${data.userid}" && to.id == "${data.userid}"`,
      });
    return response;
  }

  // /**
  //  * Retrieves a list of direct messages with the specified filter and pagination options.
  //  * @param filter - The filter to apply to the direct messages list.
  //  * @param limit - The maximum number of direct messages to retrieve.
  //  * @param offset - The offset to apply to the direct messages list.
  //  * @returns The list of direct messages that match the filter and pagination options.
  //  */
  async getDirectMessages(userId: string, friendId: string) {
    const response = await pb
      .collection(Collections.DirectMessages)
      .getFullList(100, {
        filter: `from = "${userId}"  && to = "${friendId}" ||  from = "${friendId}"  && to = "${userId}" `,
        expand:"from,to"
      });
   
AppState.directMessages = response
    return response;
  }
}

export const directMessageService = new DirectMessageService();
