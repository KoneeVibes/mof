import { BASE_ENDPOINT } from "../endpoint";

export const getCurrencies = async (token) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/currencies`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        return res.data;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
