import { BASE_ENDPOINT } from "../endpoint";

export const getFilteredDashboard = async (token, { orgName, status, collection }) => {
    try {
        const endpoint = `${BASE_ENDPOINT}/api/Dashboard/filter?status=${encodeURIComponent(status)}&orgName=${encodeURIComponent(orgName)}&collection=${encodeURIComponent(collection)}`;
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        }
        return res.data;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
