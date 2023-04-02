
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
export type UserWithStatus = UsersResponse & {
  expand: {onlineStatus: UsersStatusResponse}
}
export type FriendsWithUser = FriendsResponse & {
  expand: {friends: UserWithStatus[]}
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

export class UserClass {
  id: string;
  username: string;
  email: string;
  avatar: string | undefined
  created: string;
  updated: string;
  avatarUrl: string |undefined

  constructor(data: UsersResponse) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.avatar = data.avatar;
    this.created = data.created;
    this.updated = data.updated;
    this.avatarUrl = data.avatarUrl
  }
}

export class Friend {
  id: string;
  user: Partial<UsersResponse>;
  created: string;
  updated: string;
  onlineStatus: UsersStatusResponse;

  constructor(data: UserWithStatus) {
    this.id = data.id;
    this.user = new UserClass(data)
    // {id: data.id, username: data.username, email: data.email, avatar: data.avatar, created: data.created, updated: data.updated}
    this.created = data.created;
    this.updated = data.updated;
    this.onlineStatus = data.expand.onlineStatus
  }
}

export class Friends {
  user: string;
  friends?: Friend[] | undefined;
  friendIds: string[] | undefined
  id: string;
  created: string;
  updated: string;

  constructor(data: FriendsWithUser) {
    this.user = data.user;
    this.friends = data.expand.friends.map(f => new Friend(f))
    this.id = data.id;
    this.created = data.created;
    this.updated = data.updated;
    this.friendIds = data.friends
  }

 
 
}

export class ConvertDMToMessage{
  
  /**
    * this is the sender of the message
   *
   * @type {(UsersResponse | undefined)}
   */
  user: UsersResponse | undefined;
  
  /**
   * this is the receiver of the message
   *
   * @type {?(string | undefined)}
   */
  channel?: string | undefined;
  content: string 
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: Collections;
  expand?: unknown;
  files?: string[] | undefined;
  constructor(data: DirectMessageWithUser) {
    this.user = data.expand.from
    this.channel = data.to
    this.content = data.content
    this.id = data.id;
    this.created = data.created;
    this.updated = data.updated;
    this.collectionId = data.collectionId;
    this.collectionName = data.collectionName;
    this.expand = null
    this.files = data.files
  }

  
  
  
  
}


  
  
  
  



