
import { Admin, Record } from "pocketbase";
import type {
  ChannelsResponse,
  Collections,
  DirectMessagesResponse,
  FileUploadsResponse,
  FriendRequestResponse,
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
export type DirectMessageWithUser = DirectMessagesResponse & {
  expand: {from: UsersResponse}
}
export type FriendsWithUser = FriendsResponse & {
  expand: {friends: UsersResponse[]}
};
export type FriendsRequest = FriendRequestResponse & {
  expand: { senderId: UsersResponse, receiverId: UsersResponse };
}
export type User = Record | Admin | null | UsersResponse;

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

export class Friends {
  user: string;
  friends?: UsersResponse[] | undefined;
  friendIds: string[] | undefined
  id: string;
  created: string;
  updated: string;

  constructor(data: FriendsWithUser) {
    this.user = data.user;
    this.friends = data.expand.friends 
    this.id = data.id;
    this.created = data.created;
    this.updated = data.updated;
    this.friendIds = data.friends
  }

 
 
}

export class ConvertDMToMessage{
  user: UsersResponse | undefined;
  channel?: string | undefined;
  content?: string | undefined;
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: Collections;
  expand?: unknown;
  constructor(data: DirectMessageWithUser) {
    this.user = data.expand.from
    this.channel = data.to
    this.content = data.text
    this.id = data.id;
    this.created = data.created;
    this.updated = data.updated;
    this.collectionId = data.collectionId;
    this.collectionName = data.collectionName;
    this.expand = null
  }

  
  
  
  
}


  
  
  
  



