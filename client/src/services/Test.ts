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
  MemberUser,
  MessageWithUser,
  Server,
} from "./PocketBaseTypes/utils";
import { isValidProp } from "./utils/isValidProp";

// /** @type {import('./src/models/Account.js').Account | null} */
class ObservableAppState {
  Channels: ChannelsResponse[] = [];
  Servers = [];
  DirectMessages = [];
  Members = [];
  FileUploads = [];
  FriendRequest = [];
  Friends = [];
  Users = [];
  Messages = [];
  Likes = [];
  UsersStatus = [];

  constructor() {
    makeAutoObservable(this);
  }
}

// eslint-disable-next-line no-undef
export const TestState = new Proxy(new ObservableAppState(), {
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
