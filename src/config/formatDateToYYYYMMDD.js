import { parse, isValid, format } from 'date-fns';

export const formatDateToYYYYMMDD = (dateString) => {
    const formats = ['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd'];
    for (let formatType of formats) {
        const parsedDate = parse(dateString, formatType, new Date());
        if (isValid(parsedDate)) {
            const formattedDate = format(parsedDate, 'yyyy-MM-dd');
            return formattedDate;
        }
    }
    return dateString;
};
