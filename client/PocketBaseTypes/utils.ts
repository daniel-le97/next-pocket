
import { Admin, Record } from "pocketbase";
import type {
  ChannelsResponse,
  FileUploadsResponse,
  FriendsResponse,
  LikesResponse,
  MembersResponse,
  MessagesResponse,
  ServersResponse,
  UsersResponse,
  UsersStatusResponse,
} from "./pocketbase-types";

export type TServerExpand<T> = {
  server: ServersResponse<T>;
};

export type Response = {
  server: ServersResponse;
  member: MembersResponse;
  image: FileUploadsResponse;
};

export type MemberUser = MembersResponse<UserExpand>;

type UserExpand<T = unknown> = {
  user: UsersResponse<T>;
};

export type Server = ServersResponse<Upload>;
export type Upload = {
  image: FileUploadsResponse;
};

export type MessageWithUser = Message;
export type TMessageWithUser = MessagesResponse & {
  expand: { "likes(message)": LikesWithUser[]; user: UsersResponse };
};
export type LikesWithUser = LikesResponse & {
  expand: { user: UsersResponse };
};

export type UsersStatusWithUser = UsersStatusResponse & {
  expand: { user: UsersResponse };
};

export type friendsWithUser = FriendsResponse & {
  // expand: {}
};

export type User = Record | Admin | null

export class Message {
  id: string;
  content?: string;
  created: string;
  updated: string;
  channel?: string;
  user: UsersResponse;
  likes: number;

  constructor(data: TMessageWithUser) {
    this.id = data.id;
    this.content = data.content;
    this.created = data.created;
    this.updated = data.updated;
    this.channel = data.channel;
    this.user = data.expand.user;
    this.likes = data.expand["likes(message)"]
      ? data.expand["likes(message)"].length
      : 0;
  }
}
