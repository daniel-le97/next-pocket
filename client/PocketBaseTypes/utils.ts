import type { Admin, Record } from "pocketbase";
import type {
  ChannelsResponse,
  Collections,
  DirectMessagesResponse,
  FileUploadsResponse,
  FriendsResponse,
  FriendsStatusOptions,
  LikesResponse,
  MembersResponse,
  MessagesResponse,
  ServersResponse,
  UsersResponse,
  UsersStatusResponse,
  UsersStatusStatusOptions,
} from "./pocketbase-types";

export type UserLogin = {
  username: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  avatarUrl: string;
};

export type TServerExpand<T> = {
  server: ServersResponse<T>;
};

export type Response = {
  server: ServersResponse;
  member: MembersResponse;
  image: FileUploadsResponse;
};

export type MemberUser = MembersResponse<UserExpand>;

type UserExpand = {
  user: UsersResponse & { expand: { onlineStatus: UsersStatusResponse } };
};

export type ServerWithRelations = ServersResponse & {
  expand: {
    image: FileUploadsResponse;
    members: MemberUser[];
    "channels(server)": ChannelsResponse[];
  };
};
export type Upload = {
  image: FileUploadsResponse;
};

export type MessageWithUser = Message;
export type TMessageWithUser = MessagesResponse & {
  expand: { "likes": string[]; user: UsersResponse };
};
export type LikesWithUser = LikesResponse & {
  expand: { user: UsersResponse };
};

export type UsersStatusWithUser = UsersStatusResponse & {
  expand: { user: UsersResponse };
};
export type DirectMessageWithUser = DirectMessagesResponse & {
  expand: { user: UsersResponse; "likes(directMessage)": LikesWithUser[] };
};
export type UserWithStatus = UsersResponse & {
  expand: { onlineStatus: UsersStatusResponse };
};
export type FriendsWithUser = FriendsResponse & {
  expand: { friends: UserWithStatus[] };
};

export type User = Record | Admin | null | UsersResponse;

export class Server {
  constructor(data: ServerWithRelations) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description || `A new ${this.name} server`;
    this.private = data.private || false;
    this.owner = data.owner || "";
    this.image = data.expand.image;
    this.members = data.expand.members;
    this.channels = data.expand["channels(server)"] || [];
  }
  id: string;
  name: string;
  description: string;
  private: boolean;
  owner: string;
  image: FileUploadsResponse;
  members: MemberUser[];
  channels: ChannelsResponse[];
}

export class Message {
  id: string;
  content?: string;
  created: string;
  updated: string;
  channel?: string;
  user: UsersResponse;
  // likes: string[];
  attachments: string[];

  constructor(data: TMessageWithUser) {
    this.id = data.id;
    this.content = data.content;
    this.created = data.created;
    this.updated = data.updated;
    this.channel = data.channel;
    this.user = data.expand.user;
    this.attachments = data.attachments || [];
    // this.likes = data.expand?.['likes(message)']
  }
}

export interface IBaseMessage {
  id: string;
  content?: string;
  created: string;
  updated: string;
  user: UsersResponse | UserWithStatus | undefined;
  likes: number;
  friendRecord: string;
  channel: string;
}
export class DirectMessage {
  constructor(data: DirectMessageWithUser) {
    this.id = data.id;
    this.content = data.content;
    this.created = data.created;
    this.updated = data.updated;
    this.friendRecord = data.friendRecord;
    this.user = data.expand?.user || undefined;
  }
  id: string;
  content?: string | undefined;
  created: string;
  updated: string;
  user: UsersResponse | UserWithStatus | undefined;

  friendRecord: string;
}

export class UserClass {
  id: string;
  username: string;
  email: string;
  avatar: string | undefined;
  created: string;
  updated: string;
  avatarUrl: string | undefined;

  constructor(data: UsersResponse) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.avatar = data.avatar;
    this.created = data.created;
    this.updated = data.updated;
    this.avatarUrl = data.avatarUrl;
  }
}

export class Friend {
  friend: UserWithStatus | undefined;
  requester: UserWithStatus | undefined;
  status?: FriendsStatusOptions;
  activityStatus?: UsersStatusStatusOptions;
  blocker?: string | undefined;
  id: string;
  created: string;
  updated: string;

  constructor(data: FriendsWithUser, userId: string) {
    this.blocker = data.blocker as string;
    const requester = data.friends[0];
    this.requester = data.expand.friends.find((f) => f.id === requester);
    this.friend = data.expand.friends.find((f) => f.id !== userId);
    this.status = data.status;
    this.id = data.id;
    this.created = data.created;
    this.updated = data.updated;
    this.activityStatus = this.friend?.expand.onlineStatus.status;
  }
}

// export class Friends {
//   user: string;
//   friends?: Friend[] | undefined;
//   friendIds: string[] | undefined;
//   id: string;
//   created: string;
//   updated: string;

//   constructor(data: FriendsWithUser) {
//     this.user = data.user;
//     this.friends = data.expand.friends.map((f) => new Friend(f));
//     this.id = data.id;
//     this.created = data.created;
//     this.updated = data.updated;
//     this.friendIds = data.friends;
//   }
// }

export class ConvertDMToMessage {
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
  content: string;
  id: string;
  created: string;
  updated: string;

  attachments?: string[] | undefined;
  constructor(data: DirectMessageWithUser) {
    this.user = data.expand.user;
    this.channel = data.friendRecord;
    this.content = data.content;
    this.id = data.id;
    this.created = data.created;
    this.updated = data.updated;
    this.attachments = data.attachments;
  }
}
