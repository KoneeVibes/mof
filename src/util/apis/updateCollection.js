import { BASE_ENDPOINT } from "../endpoint";

export const updateCollection = async (token, collectionId, newCollectionDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/collections/${collectionId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newCollectionDetails)
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
