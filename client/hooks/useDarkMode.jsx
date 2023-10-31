import { useEffect, useState } from "react";

const useLocalStorage = (/** @type {string} */ key, /** @type {undefined} */ initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (/** @type {(arg0: any) => any} */ value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

// const useDarkMode = () => {

//   const [enabled, setEnabled] = useLocalStorage("dark-theme");
//   // @ts-ignore
//   const isEnabled = typeof enabledState === "undefined" && enabled;

//   useEffect(() => {
//     const className = "dark";
//     const bodyClass = window.document.body.classList;
//   const htmlClass = window.document.documentElement.classList;
//     isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
//     isEnabled ? htmlClass.add(className) : htmlClass.remove(className);
//   }, [enabled, isEnabled]);

//   return [enabled, setEnabled];
// };

const useDarkMode = () => {
  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;
    const htmlClass = window.document.documentElement.classList;

    bodyClass.add(className);
    htmlClass.add(className);
  }, []);

  // Return a boolean indicating that dark mode is enabled
  return true;
};

export default useDarkMode;
