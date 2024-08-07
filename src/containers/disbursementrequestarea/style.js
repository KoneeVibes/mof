import styled from "styled-components";

export const DisbursementRequestAreaWrapper = styled.div(() => {
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

        .dotLoader{
            margin-left: auto;
            margin-right: auto;
        }
    `
})