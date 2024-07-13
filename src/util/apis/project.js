import { BASE_ENDPOINT } from "../endpoint";

export const getProject = async (projectId) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/Projects/${projectId}`);
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
