import { BASE_ENDPOINT } from "../endpoint";

export const addOrganization = async (token, newOrganizationDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/organization`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newOrganizationDetails)
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
