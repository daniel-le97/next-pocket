import type {
  FileUploadsResponse,
  MembersResponse,
  ServersResponse,
} from "./pocketbase-types";

export type TServerExpand<T> = {
  server: ServersResponse<T>;
};

export type Response = {
  server: ServersResponse;
  member: MembersResponse;
  image: FileUploadsResponse;
};

export type Server = ServersResponse<Upload>;
export type Upload = {
  image: FileUploadsResponse;
};
