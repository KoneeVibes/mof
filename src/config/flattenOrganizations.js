export const flattenOrganizations = (organizations) => {
    return organizations.flatMap(org => [
        {
            id: org.id,
            name: org.name,
            orgType: org.orgType,
            parentOrg: org.parentOrg
        },
        ...flattenOrganizations(org.subOrganizations)
    ]);
};