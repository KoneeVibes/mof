export const getUniqueColors = async (length) => {
    try {
        const response = await fetch(`https://x-colors.yurace.pro/api/random?number=${length}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error("Error retrieving unique colors");
        }
        return res.map(color => color.hex);
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
