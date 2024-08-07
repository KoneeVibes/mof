import { BASE_ENDPOINT } from "../endpoint";

export const onboardFundingSource = async (token, userDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/funders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userDetails),
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
