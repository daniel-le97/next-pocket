import { ReactionsResponse, UsersResponse } from "../../PocketBaseTypes/pocketbase-types";
import { MessageWithUser, UnFormatedMessageWithUser } from "../../PocketBaseTypes/utils";
import { Message } from "./Message";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export class Room {
  title: string;
  Messages: Message[];
  id: string;
  created: Date;
  updated: Date;
  constructor(data: {
    title: string;
    id: string;
    created: Date;
    updated: Date;
    Messages: Message[];
  }) {
    this.title = data.title;
    this.id = data.id;
    this.created = data.created;
    this.updated = data.updated;
    this.Messages = data.Messages;
    // TODO add additional properties if needed
  }
}
