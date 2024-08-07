import { BASE_ENDPOINT } from "../endpoint";

export const updateProjectStatus = async (token, action, projectId) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/projects/${action}/${projectId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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
