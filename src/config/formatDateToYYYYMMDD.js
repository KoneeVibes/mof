export const formatDateToYYYYMMDD = (dateString) => {
    if (!dateString || dateString.split('/').length !== 3) {
        return dateString; // Return the original value if it's not a valid date
    }
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
};