import type { TMessageWithUser, UsersResponse } from "PocketBaseTypes";

export class FormattedMessage {
  id: string;
  content?: string;
  created: string;
  updated: string;
  channel?: string;
  user: UsersResponse;
  likes: number

  constructor(data : TMessageWithUser) {
    this.id = data.id; 
    this.content = data.content;
    this.created = data.created;
    this.updated = data.updated;
    this.channel = data.channel;
    this.user = data.expand.user
    this.likes = data.expand["likes(message)"] ? data.expand["likes(message)"].length : 0
  }
}
