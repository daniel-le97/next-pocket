import { action, makeAutoObservable } from "mobx";
import type {
  ChannelsResponse,
  DirectMessagesResponse,
  FriendsResponse,
  MembersResponse,
  ServersResponse,
  UsersResponse,
} from "./PocketBaseTypes/pocketbase-types";
import type {
  User,
  LikesWithUser,
  MemberUser,
  MessageWithUser,
  ServerWithRelations,
  UsersStatusWithUser,
  DirectMessageWithUser,
  Friend,
  Server,
  DirectMessage,
} from "./PocketBaseTypes/utils";
import { isValidProp } from "./utils/isValidProp";

// /** @type {import('./src/models/Account.js').Account | null} */
class ObservableAppState {
  // users & user
  user: User = null;

  userStatus: UsersStatusWithUser | null = null;
  userServers: Server[] = [];
  users: UsersStatusWithUser[] = [];
  members: MemberUser[] = [];
  userFriendId = "";

  messageQuery = "";

  activeChannel: ChannelsResponse | null | undefined = null;
  activeServer: Server | undefined = undefined;
  activeMembership: MembersResponse | null = null;

  channels: ChannelsResponse[] = [];
  servers: Server[] = []
  messages: MessageWithUser[] = [];
  directMessages: DirectMessage[] = [];
  dmTracker: boolean[] = [];
  dmRouterQuery = "";
  activeDirectMessage: UsersResponse | null = null;
  messageLikes: [LikesWithUser[]] = [[]];

  totalPages = 0;
  page = 1;
  loading = 0;

  friends: Friend[] | null = null;

  lastPath: string | null = null;
  lastQueryId: string | null = null;
  modalStatus = false

  // AppState: undefined;

  reset: () => void;

  constructor() {
    makeAutoObservable(this);
    // this.AppState = undefined;
    // this.AppState = undefined;
    this.reset = action(() => {
      this.user = null;
      this.userStatus = null;
      this.members = [];
      this.userServers = [];
      this.messageQuery = "";
      this.activeChannel = null;
      this.activeServer = undefined;
      this.activeMembership = null;
      // this.channelTitles = [];
      this.channels = [];
      this.servers = [];
      this.users = [];
      this.messages = [];
      this.directMessages = [];
      this.activeDirectMessage = null;
      this.messageLikes = [[]];
      this.totalPages = 0;
      this.page = 1;
      this.loading = 0;
      this.lastPath = null;
      this.lastQueryId = null;
    });
  }
}

export const AppState = new Proxy<ObservableAppState>(
  new ObservableAppState(),
  {
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
  }
);
