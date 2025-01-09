import { BASE_ENDPOINT } from "../endpoint";

export const getDisbursementAttachment = async (token, disbursementId, attachmentId) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/disbursements/${disbursementId}/attachments/${attachmentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorResponse = await response.text(); // Get error message
            console.error('Error:', errorResponse);
            throw new Error(errorResponse);
        }
        // Return response as a Blob for binary data
        return await response.blob();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
