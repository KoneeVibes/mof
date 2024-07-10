import styled from "styled-components";
import entityBg from "../../assets/jumbotronEntityLogoBg.svg";

export const JumbotronWrapper = styled.div(() => {
    return` 
        position: relative;
        background-color: #059212;
        width: 100%;
        min-height: 7rem;
        border-radius: 10px;

        .entity-logo-div{
            background-image: url(${entityBg});
            background-repeat: no-repeat;
        }
    `
}
)