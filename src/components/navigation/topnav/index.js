import { useNavigate } from "react-router-dom";
import { MoFLogo } from "../../../assets";
import { Avatar } from "../../avatar";
import { MenuButton } from "../../buttons/menubutton";
import { InputField } from "../../formfields/input";
import { LeftSideTopNavWrapper, RightSideTopNavWrapper, TopNavWrapper } from "./styled";
import { useEffect, useRef, useState } from "react";
import { P } from "../../typography/styled";
import React from "react";
import Cookies from "universal-cookie";
import { getSearchResult } from "../../../util/apis/search";
import { Row } from "../../flex/styled";
import { DotLoader } from "react-spinners";

export const TopNav = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();

    const navigate = useNavigate();
    const searchResultsBox = useRef();
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const navigateToDashboard = () => {
        return navigate('/dashboard');
    }

    const handleFocus = (e) => {
        setIsFocused(true);
        searchResultsBox?.current.classList.remove("hide-element");
    }

    const handleBlur = (e) => {
        setIsFocused(false);
    }

    const handleSearch = async (e) => {
        if (!cookie.TOKEN) return;
        setLoading(true);
        const result = await getSearchResult(cookie.TOKEN, e.target.value);
        setSearchResults(result ?? []);
        return setLoading(false);
    }

    const handleClickOutside = (e) => {
        if (isFocused || searchResultsBox.current.contains(e.target)) return
        searchResultsBox?.current.classList.add("hide-element");
    }

    const handleNavigateToProject = (entity, projectId) => {
        navigate(`/${entity.replace(/\s+/g, '').toLowerCase()}/${projectId}`);
        return searchResultsBox?.current.classList.add("hide-element");
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
                        placeholder={"Search for a Project"}
                        handleFocus={handleFocus}
                        handleBlur={handleBlur}
                        handleChange={handleSearch}
                    />
                </div>
                <div
                    ref={searchResultsBox}
                    className="search-results-box hide-element"
                >
                    <Row
                        className="align-row"
                    >
                        <P
                            className="search-message"
                        >
                            Your search results will show below:
                        </P>
                        {loading &&
                            <DotLoader
                                size={20}
                                color="#000000"
                                className="dotLoader"
                            />
                        }
                    </Row>
                    <div>
                        {searchResults.map((result, index) => (
                            <Row
                                key={index}
                                className="align-row"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <P
                                    className="search-result"
                                    onClick={() => handleNavigateToProject(result.organization, result.projectId)}
                                >
                                    {result.title}
                                </P>
                            </Row>
                        ))}
                    </div>
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