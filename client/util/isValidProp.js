/**
 * @param { Object } target
 * @param {symbol | string | number} prop
 */
export function isValidProp(target, prop) {
  if (typeof target[prop] === 'function') { return; }
  // eslint-disable-next-line no-prototype-builtins
  if (!target.hasOwnProperty(prop)) {
    throw new Error(`[BAD PROP]:[${prop.toString()}] Invalid Property Access via Proxy State`);
  }
}