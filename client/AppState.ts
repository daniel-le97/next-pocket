/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { action, makeAutoObservable } from "mobx";
import { Route } from "nextjs-routes";
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

class ObservableAppState {
  user: Record<string, any> | null = null;
  // /** @type {import('./src/models/Account.js').Account | null} */

  members: MemberUser[] = [];

  userServers: (ServersResponse<unknown> | undefined)[] = [];

  account: Record<string, any> | null = null;
  messageQuery = "";

  activeChannel: ChannelsResponse | null = null;
  activeServer: ServersResponse | Server = null;
  activeMembership: MembersResponse | null = null

  channelTitles: (string | undefined)[] = [];
  channels: ChannelsResponse[] = [];
  servers: Server[] = [];
  users: UsersResponse[] = [];
  messages: MessagesResponse[] = [];
  directMessages:DirectMessagesResponse[] = []
  loading = 0;

  lastPath: string | null = null

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
    return target[prop];
  },
  set(target, prop, value) {
    isValidProp(target, prop);
    action(() => {
      target[prop] = value;
    })();
    return true;
  },
});
