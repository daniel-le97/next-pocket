/* eslint-disable @typescript-eslint/no-non-null-assertion */

// import { AppState } from "AppState";
import { action } from "mobx";
import { AppState } from "AppState";
import Pop from "./Pop";

/**
 * @param {Array} array an array to add data to
 * @param {object} item item to be added
 * @param {string} field index to filter from
 */
export function addItemOrReplace<T>(array: T[], item: T, field: keyof T) {
  const index = array.findIndex((i) => i[field] == item[field]);
  if (index === -1) {
    // console.log('adding',array);
    array = [item,...array];
    // console.log('adding',array);
    return array
  }
  array[index] = item
  return array
}

/**
 * @param {string} state Must be an array
 * @param {object} item item to be added
 * @param {string} field index to filter from
 */
export function addItemOrReplaceV2<T>(state: keyof typeof AppState, item: T, field: keyof T) {
  if (!Array.isArray(AppState[state])) {
    return Pop.error('please supply a key in AppState that is an array')
  }
 action(() => {
    const index = (AppState[state] as unknown as T[]).findIndex((i) => i[field] == item[field]);
    if (index === -1) {
      (AppState[state] as unknown as T[]) = [item, ...(AppState[state] as unknown as T[])]
    } else {
      (AppState[state] as unknown as T[])[index] = item
    }
  })();
}

/**
 * @param {Array} array an array to add data to
 * @param {object} item item to remove from an array
 * @param {string} field index of the item
 */
export function filterStateArray<T>(
  state: keyof typeof AppState,
  item: T,
  field: keyof T
) {
  action(() => {
    (AppState[state] as unknown as T[]) = (AppState[state] as unknown as T[]).filter(i => i[field] != item[field])
  })();
}

export function getDate(date: Date) {
  return new Date(date).toLocaleDateString("en-Us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
export function getDateTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-Us", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
