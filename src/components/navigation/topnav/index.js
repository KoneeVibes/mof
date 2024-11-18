import { useNavigate } from "react-router-dom";
import { MoFLogo } from "../../../assets";
import { Avatar } from "../../avatar";
import { MenuButton } from "../../buttons/menubutton";
import { InputField } from "../../formfields/input";
import { LeftSideTopNavWrapper, RightSideTopNavWrapper, TopNavWrapper } from "./styled";
import { useEffect, useRef, useState } from "react";
import { P } from "../../typography/styled";

export const TopNav = () => {
    const navigate = useNavigate();
    const searchResults = useRef();
    const [isFocused, setIsFocused] = useState(false);

    const navigateToDashboard = () => {
        return navigate('/dashboard');
    }

    const handleFocus = (e) => {
        setIsFocused(true);
        searchResults?.current.classList.remove("hide-element");
    }

    const handleBlur = (e) => {
        setIsFocused(false);
    }

    const handleSearch = (e) => {

    }

    const handleClickOutside = (e) => {
        if (isFocused || searchResults.current.contains(e.target)) return
        searchResults?.current.classList.add("hide-element");
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    })
    return (
        <TopNavWrapper
            alignitems={"center"}
            justifycontent={"space-between"}
        >
            <LeftSideTopNavWrapper
                alignitems={"center"}
                justifycontent={"space-between"}
            >
                <div onClick={navigateToDashboard}>
                    <MoFLogo />
                </div>
                <div className="input-field-div">
                    <InputField
                        placeholder={"Search for a Parastatal"}
                        handleFocus={handleFocus}
                        handleBlur={handleBlur}
                        handleChange={handleSearch}
                    />
                </div>
                <div className="search-results hide-element" ref={searchResults}>
                    <P>Your search results will show below</P>
                </div>
            </LeftSideTopNavWrapper>
            <RightSideTopNavWrapper
                alignitems={"center"}
                justifycontent={"flex-end"}
            >
                <Avatar location={"top-nav"} />
                <MenuButton />
            </RightSideTopNavWrapper>
        </TopNavWrapper>
    )
}