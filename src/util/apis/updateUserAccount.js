import { BASE_ENDPOINT } from "../endpoint";

export const updateUserAccount = async (token, userId, userDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/accounts/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userDetails)
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
