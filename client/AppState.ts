
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
  FullUser,
  LikesWithUser,
  MemberUser,
  MessageWithUser,
  Server,
  UsersStatusWithUser,
} from "./PocketBaseTypes/utils";
import { isValidProp } from "./utils/isValidProp";

// /** @type {import('./src/models/Account.js').Account | null} */
class ObservableAppState {
  user: FullUser | null = null;
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


  AppState: undefined;

  friendRequests: FriendRequestResponse[] = [];
  reset: () => void;


  constructor() {
    makeAutoObservable(this);
    this.AppState = undefined;
    this.AppState = undefined;
    this.reset = action(()=>{
      this.user = null;
      this.UsersStatus = []
      this.members = [];
      this.userServers = [];
      this.messageQuery = "";
      this.activeChannel = null;
      this.activeServer = null;
      this.activeMembership = null;
      this.channelTitles = [];
      this.channels = [];
      this.servers = [];
      this.users = [];
      this.messages = [];
      this.directMessages = [];
      this.activeDirectMessage = null
      this.messageLikes = [[]]
      this.totalPages = 0;
      this.page = 1;
      this.loading = 0;
      this.lastPath = null;
      this.lastQueryId = null;
      this.friendRequests = [];
    })
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



