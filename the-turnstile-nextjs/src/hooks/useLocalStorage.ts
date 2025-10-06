"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const isBrowser = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const readValue = () => {
    if (!isBrowser()) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Failed to read localStorage key "${key}"`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    setStoredValue((currentValue) => {
      const valueToStore = value instanceof Function ? value(currentValue) : value;

      if (isBrowser()) {
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
          console.warn(`Failed to write localStorage key "${key}"`, error);
        }
      }

      return valueToStore;
    });
  };

  useEffect(() => {
    if (!isBrowser()) {
      return undefined;
    }

    setStoredValue(readValue());

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }

      try {
        setStoredValue(event.newValue ? (JSON.parse(event.newValue) as T) : initialValue);
      } catch (error) {
        console.warn(`Failed to synchronise localStorage key "${key}"`, error);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [initialValue, key]);

  return [storedValue, setValue];
};
