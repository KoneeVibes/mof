import styled from "styled-components";

export const UserRegistrationAreaWrapper = styled.div(() => {
    return `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;

        form{
            display: flex;
            flex-direction: column;
            gap: var(--flexGap);
        }
    `
})