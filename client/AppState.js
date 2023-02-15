import { action, makeAutoObservable } from "mobx";
import { isValidProp } from "./util/isValidProp.js";

class ObservableAppState {
  user = null;
  /** @type {import('./src/models/Account.js').Account | null} */
  account = null;

  test = "hi";

  messages = [];
  constructor() {
    makeAutoObservable(this);
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
