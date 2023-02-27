import { PBUser } from "./user"

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export class Message {
 text: string
 user: string
  id: string
  created: Date
  updated: Date
  expand: any
  channel: string
  constructor(data: Partial<Message>) {
    this.text = data.text!;
    this.user = data.user!;
    this.id = data.id!;
    this.expand = data.expand!
    this.channel = data.channel? data.channel : ''
    this.created = data.created || new Date(); // use default value if created is undefined
    this.updated = data.updated || new Date(); // use default value if updated is undefined
    // TODO add additional properties if needed
  }
}
//In the Message constructor, the code is using the non-null assertion operator (!) to tell TypeScript that it is safe to assume that the text, user, and id properties of the data parameter are not undefined