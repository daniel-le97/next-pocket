
import { action, makeAutoObservable } from "mobx";

import type { Admin, Record } from "pocketbase";
import type {
  ChannelsResponse,
  DirectMessagesResponse,
  FriendRequestResponse,
  MembersResponse,
  ServersResponse,
  UsersResponse,
} from "./PocketBaseTypes/pocketbase-types";
import type {
  LikesWithUser,
  MemberUser,
  MessageWithUser,
  Server,
  UsersStatusWithUser,
} from "./PocketBaseTypes/utils";
import { isValidProp } from "./utils/isValidProp";

// /** @type {import('./src/models/Account.js').Account | null} */
class ObservableAppState {
  user: Record | Admin | null = null;
  UsersStatus: UsersStatusWithUser[] = []

  members: MemberUser[] = [];

  userServers: (ServersResponse<unknown> | undefined)[] = [];

  messageQuery = "";

  activeChannel: ChannelsResponse | null = null;
  activeServer: ServersResponse | Server | null = null;
  activeMembership: MembersResponse | null = null;

  channelTitles: (string | undefined)[] = [];
  channels: ChannelsResponse[] = [];
  servers: ServersResponse[] = [];
  users: UsersStatusWithUser[] = [];
  messages: MessageWithUser[] = [];
  directMessages: DirectMessagesResponse[] = [];
  activeDirectMessage:UsersResponse | null = null
  messageLikes : [LikesWithUser[]] = [[]]

  totalPages = 0;
  page = 1;
  loading = 0;

  lastPath: string | null = null;
  lastQueryId: string | null = null;

  test = 'hello'
  AppState: undefined;

  friendRequests: FriendRequestResponse[] = [];

  constructor() {
    makeAutoObservable(this);
    this.AppState = undefined;
    this.AppState = undefined;
  }
}


export const AppState = new Proxy<ObservableAppState>(new ObservableAppState(), {
  get<T extends ObservableAppState>(target: T, prop: keyof T): T[keyof T] {
    isValidProp(target, prop);
    return target[prop];
  },
  set<T extends ObservableAppState>(
    target: T,
    prop: keyof T,
    value: T[keyof T]
  ) {
    isValidProp(target, prop);
    action(() => {
      target[prop] = value;
    })();
    return true;
  },
});


