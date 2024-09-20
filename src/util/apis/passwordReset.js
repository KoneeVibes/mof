import { BASE_ENDPOINT } from "../endpoint";

export const resetPassword = async (token, action, authDetails) => {
    let subRoute;
    switch (action) {
        case "passwordreset":
            subRoute = "change-password";
            break;
        case "firsttimepasswordreset":
            subRoute = "first-time-reset";
            break;
        case "forgotpassword":
            subRoute = "forgot-password";
            break;
        case "setnewpassword":
            subRoute = "reset-password";
            break;
        default:
            break;
    }
    try {
        const response = await fetch(`${BASE_ENDPOINT}/accounts/${subRoute}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(authDetails)
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
