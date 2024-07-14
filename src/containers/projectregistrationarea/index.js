import { TextAreaWrapper } from "../../components/formfields/textarea/styled";
import { Dashboard } from "../dashboard";
import { ProjectRegistrationAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled"
import { BaseButton } from "../../components/buttons/styled"
import { H2, Label, P } from "../../components/typography/styled";
import { ProjectRegistrationBaseInputWrapper } from "./styled";
import { ProjectRegistrationBaseInput } from "./styled";
import { ProjectRegistrationBaseButton } from "./styled";

export const ProjectRegistrationArea = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        return console.log(e.target)
    }

    return (
        <Dashboard>
            <ProjectRegistrationAreaWrapper>
                <H2>PROJECT DETAILS</H2>
                <P>PLEASE  ENTER THE PROJECT INFORMATION</P>
                <form onSubmit={handleSubmit}>
                    <Label className="projectName">Project Name</Label>
                    <BaseInputWrapper type="text" name="projectName" required />
                    <Label className="fundingSource">Funding Source</Label>
                    <BaseInputWrapper type="text" name="source" required />
                    <Label className="fundingAmount">Funding Amount</Label>
                    <BaseInputWrapper type="number" name="amount" required />
                    <Label className="projectTimeline">Project Timeline</Label>
                    <BaseInputWrapper type="number" name="timeline" required />
                    <Label className="companyName">Company Name</Label>
                    <BaseInputWrapper type="number" name="company" required />
                    <Label className="companyEmail">Company Email</Label>
                    <BaseInputWrapper type="number" name="companyEmail" required />
                    <Label className="companyPhoneNumber">Company PhoneNumber</Label>
                    <BaseInputWrapper type="number" name="companyPhonenumber" required />
                    <Label className="companyAddress">Company Address</Label>
                    <TextAreaWrapper name="companyAddress" />
                    <Label className="projectDescription">Project Description</Label>
                    <TextAreaWrapper name="projectDescription" />
                    <Label className="timelineMilestones">Timeline Milestones</Label>
                    <ProjectRegistrationBaseInputWrapper>
                    <ProjectRegistrationBaseInput type="text" placeholder="Milestone" required />
                    <ProjectRegistrationBaseInput type="date" placeholder="Startdate" required />
                    <ProjectRegistrationBaseInput type="date" placeholder="Enddate" required />
                    <ProjectRegistrationBaseButton>+</ProjectRegistrationBaseButton>
                    </ProjectRegistrationBaseInputWrapper>
                    <Label className="budgetInformation">Budget Information</Label>
                    <ProjectRegistrationBaseInputWrapper>
                    <ProjectRegistrationBaseInput type="text" placeholder="Category" required />
                    <ProjectRegistrationBaseInput type="text" placeholder="Description" required />
                    <ProjectRegistrationBaseInput type="text" placeholder="Amount" required />
                    <ProjectRegistrationBaseButton>+</ProjectRegistrationBaseButton>
                    </ProjectRegistrationBaseInputWrapper>
                    <BaseButton type="submit">Continue</BaseButton>
                </form>
            </ProjectRegistrationAreaWrapper>
        </Dashboard>
    )
}