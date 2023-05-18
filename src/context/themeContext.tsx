import { createContext, useState, useEffect, ReactNode } from 'react';

interface CountriesThemeContext {
  theme: string,
  toggleMode: () => void
};

const defaultState = {
  theme: "light",
  toggleMode: () => {}
}

export const ThemeContext = createContext<CountriesThemeContext>(defaultState);

export const ThemeContextProvider = ({ children }: {children: ReactNode}) => {

  const [theme, setTheme] = useState("light");

  const toggleMode = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark")
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light")
    };
  };

  useEffect(() => {
    const value = localStorage.getItem("theme");
    if (localStorage && typeof value === "string") {
      setTheme(value)
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleMode}}>
      {children}
    </ThemeContext.Provider>
  );
};
