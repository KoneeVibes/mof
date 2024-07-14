import { Dashboard } from "../dashboard";
import { EntityRegistrationAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { Label } from "../../components/typography/styled";

export const EntityRegistrationArea = () => {
    return (
        <Dashboard>
            <EntityRegistrationAreaWrapper>
                {/* Newton, your code for form should go under here. */}
                <form>
                    <Label>Name of Organisation:</Label>
                    <BaseInputWrapper type="text" name="organisation" required />
                    <Label>Select Organisation Type:</Label>
                    <BaseInputWrapper type="text" name="oragnisationType" required />
                    <Label>Select Parent Organisation</Label>
                    <BaseInputWrapper type="text" name="parentOrganisation" required />
                </form>
            </EntityRegistrationAreaWrapper>
        </Dashboard>
    )
}