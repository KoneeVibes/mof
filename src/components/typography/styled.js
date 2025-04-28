import styled from "styled-components";

export const H1 = styled.h1(() => {
    return `
        font-family: DM sans;
        font-weight: 700; 
        font-size: 34px;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: normal;
`
})

export const H2 = styled.h2(() => {
    return `
        font-family: Inter;
        font-weight: 600;
        font-size: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: normal;
    `
})

export const H3 = styled.h3(() => {
    return `
        font-family: Inter;
        font-weight: 500;
        font-size: 18px; 
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: normal;
    `
})

export const P = styled.p(() => {
    return `
        font-family: Inter;
        font-weight: 400;
        font-size: 14px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: normal;
    `
})
export const A = styled.a(() => {
    return `
        font-family: DM sans;
        font-weight: 500;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: normal;
    `
})
export const Td = styled.td(() => {
    return `
        font-family: Inter;
        font-weight: 400;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: normal;
    `
})
export const Th = styled.th(() => {
    return `
        font-family: Inter;
        font-weight: 500;
        font-size: 12px; 
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: normal;
    `
})
export const Label = styled.label(() => {
    return `
        font-family: Inter;
        font-size: 14px;
        font-weight: 600;
        line-height: normal;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})
export const Li = styled.li(() => {
    return `
        font-family: Inter;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        line-height: normal;
    `
})