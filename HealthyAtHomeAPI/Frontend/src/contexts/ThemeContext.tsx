import React, {createContext, ReactNode, useContext, useLayoutEffect, useState} from "react";
import {useMediaQuery} from "@mui/material";


interface IThemeContext {
    mode: "light" | "dark";
    toggleMode: (val: "light" | "dark") => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

export const useThemeContext = () => {
    return useContext(ThemeContext) as IThemeContext;
}

export const ThemeContextProvider: React.FC<ReactNode> = ({children}) => {

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(prefersDarkMode ? "dark" : "light");

    useLayoutEffect(() => {
        const mode = localStorage.getItem("mode") as "light" | "dark";
        if (mode !== null && ["light", "dark"].includes(mode)) {
            setCurrentTheme(mode);
        }
    }, [])

    const toggleDarkMode = () => {
        localStorage.setItem("mode", currentTheme === "dark" ? "light" : "dark");
        setCurrentTheme(prev => prev === "dark" ? "light" : "dark");
    }

    return (
        <ThemeContext.Provider
            value={{
                mode: currentTheme,
                toggleMode: toggleDarkMode
            }}
        >
            {children}
        </ThemeContext.Provider>
    )

}