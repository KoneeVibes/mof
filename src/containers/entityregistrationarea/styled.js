import styled from "styled-components";

export const EntityRegistrationAreaWrapper = styled.div(() => {
    return `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flexStart;

        form{
            display: flex;
            flex-direction: column;
            gap: var(--flexGap);
            text-transform: capitalize;
        }

        BaseButton{
        margin-top: 4rem;
        text-transform: capitalize;
        }
    `
})