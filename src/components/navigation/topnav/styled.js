import styled from "styled-components";
import { Row } from "../../flex/styled";

export const TopNavWrapper = styled(Row)`
    ${({ cardPadding = 'var(--cardPadding)', navHeight = "var(--navHeight)" }) => {
        return `
            padding: ${cardPadding};
            position: fixed;
            top: 0;
            width: -webkit-fill-available;
            background-color: #FFFFFF;
            z-index: 2;

            @media screen and (min-width: 0px){
                justify-content: center;
            }

            @media screen and (min-width: 280px){
                justify-content: space-between;
            }
        `
    }}
`

export const LeftSideTopNavWrapper = styled(Row)(() => {
    return `
        @media screen and (min-width: 0px){
            flex-basis: 50%;
            gap: calc(1.5 * var(--flexGap));
            display: none;

            .input-field-div{
                display: none;
                width: 100%;
            }

            svg{
                width: 100%;
                height: auto;
            }

            .search-results{
                position: absolute;
                top: var(--navHeight);
                left: calc(var(--navWidth));
                right: var(--cardPadding);
                padding: var(--cardPadding);
                z-index: 1;
                background: #FFFFFF;
                border: 3px solid #F0F0F0;
                border-radius: 8px;
                display: none;
            }
        }

        @media screen and (min-width: 280px){
            display: flex;
        }

        @media screen and (min-width: 768px){
            .input-field-div{
                display: block;
            }

            .hide-element{
                display: none !important;
            }

            .search-results{
                display: block
            }
        }

        @media screen and (min-width: 768px) and (max-width: 1280px) {
            flex-basis: 75%;
        }

        @media screen and (min-width: 1280px){
            gap: calc(2 * var(--flexGap));
        }
    `
})

export const RightSideTopNavWrapper = styled(Row)(() => {
    return `
        @media screen and (min-width: 1024px) {
            
        }
    `
})