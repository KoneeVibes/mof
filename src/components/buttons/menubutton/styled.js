import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../../context";

export const MenuButtonWrapper = styled.button(() => {
    const { isMenuOpen } = useContext(Context);
    return `
        .bar{
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px auto;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
            background-color: #059212;
        }

        span:nth-of-type(2){
            opacity: ${isMenuOpen ? 0 : 1}
        }

        span:nth-of-type(1){
            transform: ${isMenuOpen ? "translateY(8px) rotate(45deg)" : "unset"}
        }
        
        span:nth-of-type(3){
            transform: ${isMenuOpen ? "translateY(-8px) rotate(-45deg)" : "unset"}
        }

        @media screen and (min-width: 768px){
            display: none;
        }
    `
})