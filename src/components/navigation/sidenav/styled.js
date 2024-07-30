import styled from "styled-components";
import { Column } from "../../flex/styled";
import { useContext, useEffect } from "react";
import { Context } from "../../../context";

export const SideNavWrapper = styled("div")`
    ${({ cardPadding = 'var(--cardPadding)' }) => {
        const { isMenuOpen } = useContext(Context);
        useEffect(() => {
            if (isMenuOpen) {
                document.body.style.overflowY = "hidden";
            } else {
                document.body.style.overflowY = "visible";
            }
        }, [isMenuOpen]);
        return `
            @media screen and (min-width: 0px){
                display: ${!isMenuOpen ? "none" : "block"};
                position: fixed;
                top: 6.1375rem;
                bottom: 0;
                overflow: auto;
                background-color: #FFFFFF;
                z-index: 1;
                width: 100%;
                

                .avatar-div{
                    padding: ${cardPadding};
                }
            }

            @media screen and (min-width: 450px){
                top: var(--navHeight);
            }

            @media screen and (min-width: 768px){
                display: block;
                width: var(--navWidth);

                .avatar-div{
                    display: none;
                }
            }
        `;
    }}
`;

export const SideNavItemsListWrapper = styled(Column)(
    ({ cardPadding = 'var(--cardPadding)' }) => {
        return `
        gap: 0;
        justify-content: space-between;
        height: -webkit-fill-available;
        p {
            padding: ${cardPadding};
            margin-block: 0;
            cursor: pointer;
        }

        .navItem {
            &:hover {
                border-left: 6px solid;
                border-left-color: #059212;
                background-color: #afedb5;
            }
        }

        li {
            cursor: pointer;
            padding: 0 ${cardPadding};
            margin-block: 0.5rem;
        }
        
        ul {
            margin-left: 1.9rem;
            margin-block: 0;
        }

        .unpopulated{
            cursor: none;
            color: #EBEBE4;
        }
    `
    });
