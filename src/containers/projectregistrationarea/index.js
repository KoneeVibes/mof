import { TextAreaWrapper } from "../../components/formfields/textarea/styled";
import { Dashboard } from "../dashboard";
import { ProjectRegistrationAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled"
import { BaseButton } from "../../components/buttons/styled"
import { H2, P } from "../../components/typography/styled";

export const ProjectRegistrationArea = () => {
    return (
        <Dashboard>
            <ProjectRegistrationAreaWrapper>
                <H2>PROJECT DETAILS</H2>
                <P>PLEASE  ENTER THE PROJECT INFORMATION</P>
                <form>
                    <label className="projectName">Project Name</label>
                    <BaseInputWrapper type="text" name="text" required />
                    <label className="fundingSource">Funding Source</label>
                    <BaseInputWrapper type="text" name="text" required />
                    <label className="fundingAmount">Funding Amount</label>
                    <BaseInputWrapper type="number" name="number" required />
                    <label className="projectTimeline">Project Timeline</label>
                    <BaseInputWrapper type="number" name="number" required />
                    <label className="projectDescription">Project Description</label>
                    <TextAreaWrapper />
                    <label className="timelineMilestones">Timeline Milestones</label>
                    <TextAreaWrapper />
                    <label className="budgetInformation">Budget Information</label>
                    <TextAreaWrapper />
                    <BaseButton type="submit">Continue</BaseButton>
                </form>
            </ProjectRegistrationAreaWrapper>
        </Dashboard>
    )
}