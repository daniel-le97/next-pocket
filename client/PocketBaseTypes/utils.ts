import { FormattedMessage } from "utils/NewMessage";
import type {
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


export type MessageWithUser = FormattedMessage
export type TMessageWithUser = MessagesResponse & {
  expand: { 'likes(message)': LikesWithUser[]; user: UsersResponse };
};
export type LikesWithUser = LikesResponse & {
  expand: {user: UsersResponse}
}

export type UsersStatusWithUser = UsersStatusResponse & {
  expand: {user: UsersResponse}
}

export type friendsWithUser = FriendsResponse & {
  // expand: {}
}




