import { useState, useEffect } from "react";

export function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    const localStorageData = localStorage.getItem(key);
    if (!localStorageData) return initialValue;
    return JSON.parse(localStorageData);
  });
  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [key, value]
  );

  return [value, setValue];
}
