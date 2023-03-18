/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { action, makeAutoObservable } from "mobx";

import { Admin, Record } from "pocketbase";
import type {
  ChannelsResponse,
  DirectMessagesResponse,
  FriendRequestResponse,
  MembersResponse,
  MessagesResponse,
  ServersResponse,
  UsersResponse,
} from "./PocketBaseTypes/pocketbase-types";
import type { MemberUser, Server } from "./PocketBaseTypes/utils";
import { isValidProp } from "./utils/isValidProp";

// /** @type {import('./src/models/Account.js').Account | null} */
class ObservableAppState {
  user: Record | Admin | null = null;

  members: MemberUser[] = [];

  userServers: (ServersResponse<unknown> | undefined)[] = [];

  messageQuery = "";

  activeChannel: ChannelsResponse | null = null;
  activeServer: ServersResponse | Server | null = null;
  activeMembership: MembersResponse | null = null

  channelTitles: (string | undefined)[] = [];
  channels: ChannelsResponse[] = [];
  servers: Server[] = [];
  users: UsersResponse[] = [];
  messages: MessagesResponse[] = [];
  directMessages:DirectMessagesResponse[] = []

  totalPages = 0
  page = 1
  loading = 0;

  lastPath: string | null = null
  lastQueryId: string | null = null

  AppState: undefined;

  friendRequests: FriendRequestResponse[] = [];

  constructor() {
    makeAutoObservable(this);
    this.AppState = undefined;
    this.AppState = undefined;
  }
}

// eslint-disable-next-line no-undef
export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop);
    //@ts-expect-error any
    return target[prop];
  },
  set(target, prop, value) {
    isValidProp(target, prop);
    action(() => {
      //@ts-expect-error any
      target[prop] = value;
    })();
    return true;
  },
});
