/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @param {Array} array an array to add data to
 * @param {object} item item to be added
 * @param {string} field index to filter from
 */
export function addItemOrReplace<T>(array: T[], item: T, field: keyof T) {
  const index = array.findIndex((i) => i[field] == item[field]);
  if (index === -1) {
    array = [...array, item];
    return
  }
  array[index] = item
}

/**
 * @param {Array} array an array to add data to
 * @param {object} item item to remove from an array
 * @param {string} field index of the item
 */
export function filterArray<T, K extends keyof T>(array: T[], item: T[K] , field: K){
  array = array.filter(i => i[field] != item)
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
