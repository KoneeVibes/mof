import { Dashboard } from "../dashboard";
import { EntityRegistrationAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled"
import { BaseButton } from "../../components/buttons/styled"
import { Label } from "../../components/typography/styled";

export const EntityRegistrationArea = () => {
    return (
        <Dashboard>
            <EntityRegistrationAreaWrapper>
            <form onSubmit={handleSubmit}>
                    <Label className="nameOfOrganisation">Name of organisation:</Label>
                    <BaseInputWrapper type="text" name="nameOfOrganisation" required />
                    <Label className="organisationSelection">select organisation type</Label>
                    <BaseInputWrapper type="text" name="organisationSelection" required />
                    <Label className="parentOrganisationSelection">select parent organisation</Label>
                    <BaseInputWrapper type="text" name="parentOrganisationSelection" required />
                    <BaseButton type="submit">save</BaseButton>
                    </form>

            </EntityRegistrationAreaWrapper>
        </Dashboard>
    )
}