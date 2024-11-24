import styled from "styled-components";
import { Column } from "../../flex/styled";
import { useContext, useEffect } from "react";
import { Context } from "../../../context";

export const SideNavWrapper = styled("div")`
  ${({ cardPadding = "var(--cardPadding)" }) => {
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
                top: var(--navHeight);
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
    ({ cardPadding = "var(--cardPadding)" }) => {
        return `
        gap: 0;
        justify-content: space-between;
        @supports (height: -webkit-fill-available) {
            height: -webkit-fill-available;
        }
        @supports (height: -moz-available) {
            height: -moz-available;
        }
        p {
            padding: ${cardPadding};
            margin-block: 0;
            cursor: pointer;
        }
        .navItem {
            align-items: center;
            &:hover {
                border-left: 6px solid;
                border-left-color: #059212;
                background-color: #afedb5;
            }
        }
        .dashboard{
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
        dropdown {
            position: relative;
            display: inline-block;
        }
        .dropbtn {
            background-color: transparent;
            color: black;
            font-size: 16px;
            cursor: pointer;
            display: inline-block;
            padding: 0;
            border: none;
        }

        .dotLoader{
            margin: 0 auto;
        }
        .entity{
            align-items: center;
        }
        .entityItem {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          width: 50%;
         }
       .dotloaderItem {
          display: flex;
          align-items: center; 
          gap: 10px; 
         width: 50%; 
        }
    `;
    }
);
