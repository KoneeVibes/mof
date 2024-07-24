export const sortArrayByMonth = (array) => {
    const sortedMetrics = array?.sort((a, b) => {
        const dateA = new Date(`${a.year}-${new Date(a.month + " 1, 2021").getMonth() + 1}`);
        const dateB = new Date(`${b.year}-${new Date(b.month + " 1, 2021").getMonth() + 1}`);
        return dateA - dateB;
    });

    const lastSixMonthsMetrics = sortedMetrics?.slice(-6);
    const labels = lastSixMonthsMetrics?.map(metric => metric.month);
    const values = lastSixMonthsMetrics?.map(metric => metric.count);

    return {
        labels,
        values
    };
}
