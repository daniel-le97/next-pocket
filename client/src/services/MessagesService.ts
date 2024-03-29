/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { AppState } from "AppState";
import { action } from "mobx";
import {
  DirectMessagesRecord,
  DirectMessagesResponse,
  FileUploadsRecord,
  FileUploadsResponse,
  FileUploadsStatusOptions,
  MessagesRecord,
  MessageWithUser,
  TMessageWithUser,
} from "PocketBaseTypes";
import { Message } from "PocketBaseTypes";
import { Collections } from "PocketBaseTypes";
import { addItemOrReplaceV2, filterStateArray } from "utils/Functions";
import { logger } from "utils/Logger";

import { pb } from "utils/pocketBase";
import { channelsService } from "./ChannelsService";

class MessageService {
  /**
   * Sends a new message to a channel
   * @param data - The message data to send
   * @returns The newly created message
   */
  async sendMessage(
    data: MessagesRecord,
    messageAttachmentRecords: FileUploadsResponse[]
  ) {
    // console.log(data);

    const messageRecord = await pb
      .collection(Collections.Messages)
      .create<MessageWithUser>(data, { expand: "user" });

    if (messageAttachmentRecords) {
      for await (const messageAttachmentRecord of messageAttachmentRecords) {
        messageAttachmentRecord.status = FileUploadsStatusOptions.uploaded;
        messageAttachmentRecord.message = messageRecord.id;
        await pb
          .collection(Collections.FileUploads)
          .update(messageAttachmentRecord.id, messageAttachmentRecord, {
            expand: "message",
          });
      }
      // if (res.id) {
      //   addItemOrReplaceV2('messages', res, "id");
      // }
    }
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
        expand: "user,likes",
      });
    // console.log("messages", res);

    AppState.messages = res.items;
  }

  /**
   * Gets the list of messages for a specific channel
   * @param id - The ID of the channel to get messages for
   * @returns The list of messages for the specified channel
   */
  async getMessagesByChannelId(id: string, page = AppState.page) {
    const { items, totalPages } = await pb
      .collection(Collections.Messages)
      .getList(page, 50, {
        filter: `channel.id = "${id}"`,
        sort: "-created",
        expand: "user,likes(message).user",
      });

    const unMessages = items as unknown as TMessageWithUser[];
    // console.log("unMessages", unMessages);

    action(() => {
      AppState.messages = [...AppState.messages, ...items];

      // console.log(AppState.messages);

      // AppState.messages = [
      //   ...AppState.messages,
      //   ...unMessages.map((message) => {
      //     const _Message: MessageWithUser = new Message(message);
      //     // AppState.messageLikes[message.id as unknown as number] = message.expand["likes(message)"] || [];
      //     return _Message;
      //   }),
      // ];
      AppState.totalPages = totalPages;

      // console.log(AppState.messages);
    })();
  }

  async subscribe() {
    logger.log("messagesService.subscribe()");
    const subscribe = await pb
      .collection(Collections.Messages)
      .subscribe("*", async ({ action, record }) => {
        logger.assert(action, "action");
        if (action !== "delete") {
          const message = await this.getById(record.id);
          addItemOrReplaceV2("messages", message, "id");
        }
        if (action === "delete") {
          filterStateArray("messages", record, "id");
        }
      });
    return subscribe;
  }

  async getById(id: string) {
    const res = await pb
      .collection(Collections.Messages)
      .getOne("tf2gj34udvekq6q", { expand: "user,likes" });

    // console.log(res);
    return res;
    // return new Message(res);
  }
  async deleteMessage(id: string) {
    await pb.collection(Collections.Messages).delete(id);
  }
  async editMessage(id: string, data: MessagesRecord) {
    const message = await this.getById(id);
    const newMessage: MessagesRecord = {
      user: data.user || message.user.id,
      channel: data.channel || message.channel,
      content: data.content || message.content,
      attachments: data.attachments || message.attachments,
    };
    return await pb
      .collection(Collections.Messages)
      .update<TMessageWithUser>(id, newMessage, {
        expand: "user,likes(message)",
      });
  }
}

export const messageService = new MessageService();
