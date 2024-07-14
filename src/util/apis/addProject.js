import { BASE_ENDPOINT } from "../endpoint";

export const addProject = async (token, newProjectDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newProjectDetails)
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
