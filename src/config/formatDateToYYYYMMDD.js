import { parse, isValid } from 'date-fns';

export const formatDateToYYYYMMDD = (dateString) => {
    const formats = ['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd'];
    for (let format of formats) {
        const parsedDate = parse(dateString, format, new Date());
        if (isValid(parsedDate)) {
            return parsedDate.toISOString().split('T')[0];
        }
    }
    return dateString;
};
