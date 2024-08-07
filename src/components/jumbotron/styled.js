import styled from "styled-components";
import entityBg from "../../assets/jumbotronEntityLogoBg.svg";

export const JumbotronWrapper = styled.div(() => {
    return ` 
        position: relative;
        background-color: #059212;
        width: 100%;
        min-height: 9rem;
        border-radius: 10px;

        .entity-logo-div{
            background-image: url(${entityBg});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: top right;
            width: 40%;
            min-height: inherit;
            height: 100%;
            position: relative;
            padding: var(--cardPadding);
        }

        .entity-logo-div>img{
            width: 100%;
            height: inherit;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    `
}
)