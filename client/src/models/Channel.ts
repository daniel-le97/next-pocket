import { type } from "os";
import { Message } from "./Message";
import { PBUser } from "./PBUser";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// export class Channel {
//   title: string;
//   Messages: any
//   id: string;
//   created: Date;
//   updated: Date;
//   constructor(data: {
//     title: string;
//     id: string;
//     created: Date;
//     updated: Date;
//     Messages: Message[];
//   }) {
//     this.title = data.title;
//     this.id = data.id;
//     this.created = data.created;
//     this.updated = data.updated;
//     this.Messages = data.Messages;
//     // TODO add additional properties if needed
//   }
// }
export type PBChannel = {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  messages: string;
  title: string;
  updated: string;
  expand: Record<string, unknown>;
  members: PBUser[]
   // or you could specify a more specific type for the `expand` property if you know what it should contain
}