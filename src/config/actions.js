export const getActions = (role, projectStatus) => {
    if (role === "SuperAdmin") {
        return [
            ...(projectStatus === "Pending" ? ["Approve"] : []),
            "Terminate",
            "Re-open"
        ];
    } else if (role === "SubAdmin") {
        return ["Close", "Re-open", "Terminate"];
    }
    return [];
}