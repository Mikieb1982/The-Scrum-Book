"use client";

import { useCallback, useEffect } from "react";

import { useLocalStorage } from "./useLocalStorage";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "dark";

export const useTheme = (): [Theme, () => void] => {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_STORAGE_KEY, DEFAULT_THEME);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, [setTheme]);

  return [theme, toggleTheme];
};
