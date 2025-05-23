import styled from "styled-components";

export const CollectionRegistrationAreaWrapper = styled("div")(() => {
    return `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;

        form{
            display: flex;
            flex-direction: column;
            gap: var(--flex-gap);
        }

        .dotLoader{
            margin-left: auto;
            margin-right: auto;
        }
    `
})