import { BASE_ENDPOINT } from "../endpoint";

export const getFilteredProjectsPerOrganization = async (token, organizationId, { status }) => {
    try {
        const queryParams = new URLSearchParams();
        if (status) queryParams.append('status', status);

        const url = `${BASE_ENDPOINT}/api/projects/orgs/${organizationId}` +
            (queryParams.toString() ? `?${queryParams.toString()}` : '');

        const response = await fetch(url, {
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
