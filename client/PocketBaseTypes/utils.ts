import type {
  FileUploadsResponse,
  LikesResponse,
  MembersResponse,
  MessagesResponse,
  ServersResponse,
  UsersResponse,
} from "./pocketbase-types";

export type TServerExpand<T> = {
  server: ServersResponse<T>;
};

export type Response = {
  server: ServersResponse;
  member: MembersResponse;
  image: FileUploadsResponse;
};

export type MemberUser = MembersResponse<UserExpand>

type UserExpand<T = unknown> = {
  user: UsersResponse<T>
}

export type Server = ServersResponse<Upload>;
export type Upload = {
  image: FileUploadsResponse;
};

type UserRes = {
  user: UsersResponse;
};


export type MessageWithUser = MessagesResponse & {
  expand: { 'likes(message)': LikesWithUser[]; user: UsersResponse };
};
export type LikesWithUser = LikesResponse & {
  expand: {user: UsersResponse}
}




