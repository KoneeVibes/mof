import { BASE_ENDPOINT } from "../endpoint";

export const getProjectMembers = async (token, projectId) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/projects/${projectId}/teams`, {
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
