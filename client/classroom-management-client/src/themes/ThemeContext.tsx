// ThemeContext.tsx
import React, { createContext, useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const blueTheme = createTheme({
  palette: {
    primary: {
      main: "#3f50b5", // Blue
    },
  },
});

export const redTheme = createTheme({
  palette: {
    primary: {
      main: "#f44336", // Red
    },
  },
});

interface ThemeContextProps {
  toggleTheme: () => void;
  isBlueTheme: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProviderWithContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBlueTheme, setIsBlueTheme] = useState(true);

  const toggleTheme = () => setIsBlueTheme((prev) => !prev);

  const currentTheme = isBlueTheme ? blueTheme : redTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme, isBlueTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProviderWithContext");
  }
  return context;
};
