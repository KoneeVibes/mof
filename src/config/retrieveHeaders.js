export const retrieveHeaders = (items, header) => {
    const headers = items?.map(item => item[header]);
    return headers;
}