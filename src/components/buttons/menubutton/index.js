import { useContext } from "react";
import { MenuButtonWrapper } from "./styled";
import { Context } from "../../../context";

export const MenuButton = () => {
    const { isMenuOpen, setIsMenuOpen } = useContext(Context);
    return (
        <MenuButtonWrapper
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            <span className='bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
        </MenuButtonWrapper>
    )
}