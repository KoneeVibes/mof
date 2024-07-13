import { BASE_ENDPOINT } from "../endpoint";

export const authUser = async (authDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/accounts/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authDetails)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        return res;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
