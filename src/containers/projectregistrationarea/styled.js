import styled from "styled-components";

export const ProjectRegistrationAreaWrapper = styled.div(() => {
    return `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flexStart;

        form{
            display: flex;
            flex-direction: column;
            gap: var(--flexGap);
        }
    `
})