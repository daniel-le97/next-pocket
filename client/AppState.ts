/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { action, makeAutoObservable } from "mobx";
import type { ChannelsResponse, FileUploadsResponse, MessagesResponse, ServersResponse, UsersResponse } from "./PocketBaseTypes/pocketbase-types";
import { BaseSystemFields, ChannelsRecord, MessagesRecord, UsersRecord } from "./PocketBaseTypes/pocketbase-types";
import { isValidProp } from "./utils/isValidProp";


class ObservableAppState {
  user: Record<string, any> | null = null;
  /** @type {import('./src/models/Account.js').Account | null} */

  userServers: (ServersResponse<unknown> | undefined)[] = [];
  account: Record<string, any> | null = null;
  messageQuery = "";

  activeChannel: ChannelsResponse | null = null;
  activeServer: ServersResponse | null = null;

  channelTitles: (string | undefined)[] = [];
  channels: ChannelsResponse[] = [];
  servers: ServersResponse[] = [];
  users: UsersResponse[] = [];
  messages: MessagesResponse[] = [];
  loading = 0;
  AppState: undefined;

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
