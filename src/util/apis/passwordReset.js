import { BASE_ENDPOINT } from "../endpoint";

export const resetPassword = async (token, action, authDetails) => {
    let subRoute;
    const transformedAuthDetails = action === "setnewpassword" ? { token: token, ...authDetails } : authDetails;
    switch (action) {
        case "passwordreset":
            subRoute = "change-password";
            break;
        case "firsttimepasswordreset":
            subRoute = "first-time-reset";
            break;
        // route to send a reset url to email on click of forgot password
        // in the login area
        case "forgotpassword":
            subRoute = "forgot-password";
            break;
        // route to set a new password after clicking the reset url in email
        // and submitting the new password in the reset password area
        case "setnewpassword":
            subRoute = "reset-password";
            break;
        default:
            break;
    }
    try {
        console.log(transformedAuthDetails);
        const response = await fetch(`${BASE_ENDPOINT}/api/accounts/${subRoute}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(transformedAuthDetails)
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
