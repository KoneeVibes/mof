import { BASE_ENDPOINT } from "../endpoint";

export const onboardSubAdmin = async (token, subAdminDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/accounts/sub-admin/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(subAdminDetails),
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
