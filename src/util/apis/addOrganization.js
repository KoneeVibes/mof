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
        console.log("API Response:", response);

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
