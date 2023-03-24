/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @param {Array} array an array to add data to
 * @param {object} item item to be added
 * @param {string} field index to filter from
 */
export function addItemOrSkip<T>(array: T[], item: T, field: keyof T) {
  const found = array.find((i) => i[field] == item[field]);
  if (!found) {
    array = [...array, found!];
  }
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
/**
 * @param {Object} newData data to replace existing fields
 * @param {object} originalData old data to update
 */
