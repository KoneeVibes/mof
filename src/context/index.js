import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <Context.Provider value={{ isMenuOpen, setIsMenuOpen }}>
            {children}
        </Context.Provider>
    )
}