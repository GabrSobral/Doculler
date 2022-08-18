import { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeProps {
  isDark: boolean;
  handleTheme: () => void;
}

type Theme = "light" | "dark";

export const ThemeContext = createContext({} as ThemeProps);

export const ThemeProvider = ({ children } : { children: ReactNode }) => {
  const [ theme, setTheme ] = useState<Theme>("light");
  const localStorageName = "doculler-client-theme"

  useEffect(() => {
    const storageTheme: Theme = localStorage.getItem(localStorageName) as Theme || "light";
    setTheme(storageTheme);
  },[])

  useEffect(() => {
    document.documentElement.setAttribute("class", theme);
    localStorage.setItem(localStorageName, theme);
  },[theme])

  const handleTheme = () => {
    setTheme(state => state === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{
      isDark: theme === "dark",
      handleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}