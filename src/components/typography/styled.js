import styled from "styled-components";

export const H1 = styled.h1(() => {
    return `
        font-family: Avenir-Next;
        font-weight: 700; 
        font-size: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
     `
})

export const H2 = styled.h2(() => {
    return `
        font-family: Avenir-Next;
        font-weight: 600;
        font-size: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})

export const H3 = styled.h3(() => {
    return `
        font-family: Work Sans;
        font-weight: 600;
        font-size: 18px; 
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})

export const P = styled.p(() => {
    return `
        font-family: Avenir-Next;
        font-weight: 400;
        font-size: 20px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})
export const A = styled.a(() => {
    return `
        font-family: Avenir-Next;
        font-weight: 800;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})
export const Td = styled.td(() => {
    return `
        font-family: Work Sans;
        font-weight: 500;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})
export const Th = styled.th(() => {
    return `
        font-family: work Sans;
        font-weight: 600;
        font-size: 14px; 
        overflow: hidden;
        text-overflow: ellipsis;
    `
})
export const Label = styled.label(() => {
    return `
        font-family: Work Sans;
        font-size: 18px;
        font-weight: 600;
        line-height: 16.42px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})
export const Li = styled.li(() => {
    return `
        font-family: Work Sans;
        font-size: 16px;
        font-weight: 400;
        text-align: left;
    `
})