import { BASE_ENDPOINT } from "../endpoint";

export const makeDisbursement = async (token, formData) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/disbursements`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error('API fetch error:', error.message);
        throw error;
    }
};
