/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/**
 * @param { Object } target
 * @param {symbol | string | number} prop
 */
export function isValidProp<T>(target: T, prop: keyof T) {
  if (typeof target[prop] === 'function') { return; }
  // eslint-disable-next-line no-prototype-builtins
  if (!Object.prototype.hasOwnProperty.call(target, prop)) {
    throw new Error(
      `[BAD PROP]:[${prop.toString()}] Invalid Property Access via Proxy State`
    );
  }
}



// explains what a javasvrpt proxy is

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy