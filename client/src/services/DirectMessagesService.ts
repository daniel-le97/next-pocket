import { AppState } from "AppState";
import type {
  DirectMessagesRecord,
  DirectMessagesResponse,
  DirectMessageWithUser,
  UsersResponse} from "PocketBaseTypes";
import {
  DirectMessage
} from "PocketBaseTypes";
import { Collections } from "PocketBaseTypes";
import { pb } from "utils/pocketBase";



class DirectMessageService {
  async getOne(id: string) {
    const res = await pb
      .collection(Collections.DirectMessages)
      .getOne<DirectMessagesResponse>(id);
    return res;
  }
  /**
   * Creates a new direct message.
   * @param message - The direct message to create.
   * @returns The newly created direct message object.
   */
  async createDirectMessage(message: DirectMessagesRecord) {
    const res = await pb
      .collection(Collections.DirectMessages)
      .create<DirectMessageWithUser>(message, {
        expand: "user",
      });
    return res;
  }

  /**
   * Updates an existing direct message with the specified ID.
   * @param id - The ID of the direct message to update.
   * @param message - The updated direct message object.
   * @returns The updated direct message object.
   */
  async updateDirectMessage(id: string, message: DirectMessagesRecord) {
    const dm = await this.getOne(id);
    const newDm: DirectMessagesRecord = {
      user: message.user || dm.user,
      friendRecord:message.friendRecord || dm.friendRecord,
      content: message.content || dm.content,
      attachments: message.attachments || dm.attachments,
    }
    const res = await pb
      .collection(Collections.DirectMessages)
      .update<DirectMessageWithUser>(id, newDm);
    return res;
  }
  async subscribeToDM(id:string){
    // console.log("subscribing to dm")
    const subscribe = await pb
      .collection(Collections.DirectMessages)
      .subscribe("*",({ action, record }) => {
        const message = record as unknown as DirectMessageWithUser;
        console.log('subscribe on dms',{message: message, action: action})
        const isFriend = AppState.friends?.find((f) => f.id === message.friendRecord && f.requester?.id == message.user)
        if (!isFriend) return;
        if (action !== 'delete'){
          // message.expand.user = isFriend.friend as UsersResponse;
          const directMessage = new DirectMessage(message);
          directMessage.user = isFriend.requester
          const foundIndex = AppState.directMessages.findIndex((m) => m.id === message.id);
          if (foundIndex === -1) {
            AppState.directMessages = [directMessage, ...AppState.directMessages];
          }else{
            AppState.directMessages[foundIndex] = directMessage;
          }
          return
        }
        AppState.directMessages = AppState.directMessages.filter((m) => m.id !== message.id);
      });
    return subscribe;

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
    const res = await pb
      .collection(Collections.DirectMessages)
      .getList(page, 50, {
        filter: `friendRecord.id = "${friendId}"`,
        sort: "-created",
        expand: "user,likes(directMessage).user",
      });
    const messages = (res.items as unknown as DirectMessageWithUser[]).map((message, index) => {
      const newMessage = new DirectMessage(message);
      AppState.messageLikes[index] = message.expand["likes(directMessage)"] || [];
      return newMessage;
    });
    AppState.directMessages = [...AppState.directMessages, ...messages];
    AppState.totalPages = res.totalPages;
    return messages;
  }
}

export const directMessageService = new DirectMessageService();
