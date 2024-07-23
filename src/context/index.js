import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isavatarmodalopen, setIsAvatarModalOpen] = useState(0);
    return (
        <Context.Provider value={{ isMenuOpen, setIsMenuOpen, isavatarmodalopen, setIsAvatarModalOpen }}>
            {children}
        </Context.Provider>
    )
}
