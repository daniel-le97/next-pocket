/* eslint-disable @typescript-eslint/no-non-null-assertion */

// import { AppState } from "AppState";

/**
 * @param {Array} array an array to add data to
 * @param {object} item item to be added
 * @param {string} field index to filter from
 */
export function addItemOrReplace<T>(array: T[], item: T, field: keyof T) {
  const index = array.findIndex((i) => i[field] == item[field]);
  if (index === -1) {
    // console.log('adding',array);
    array = [...array, item];
    // console.log('adding',array);
    return array
  }
  array[index] = item
  return array
}
// export function addItemOrReplaceTest<T>(stateKey: keyof typeof AppState, item: T, field: keyof T) {
//   AppState[stateKey] =  AppState[stateKey] as unknown as T[];
//   const index = state.findIndex((i) => i[field] == item[field]);
//   if (index === -1) {
//    state = [...state, item]
//     return
//   }
//   state[index] = item
  
// }

/**
 * @param {Array} array an array to add data to
 * @param {object} item item to remove from an array
 * @param {string} field index of the item
 */
export function filterArray<T, K extends keyof T>(array: T[], item: T[K] , field: K){
  array = array.filter(i => i[field] == item)
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
