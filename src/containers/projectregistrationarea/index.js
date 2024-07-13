import { TextAreaWrapper } from "../../components/formfields/textarea/styled";
import { Dashboard } from "../dashboard";
import { ProjectRegistrationAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled"
import { BaseButton } from "../../components/buttons/styled"
import { H2, Label, P } from "../../components/typography/styled";

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
                    <BaseInputWrapper type="text" name="text" required />
                    <Label className="fundingSource">Funding Source</Label>
                    <BaseInputWrapper type="text" name="text" required />
                    <Label className="fundingAmount">Funding Amount</Label>
                    <BaseInputWrapper type="number" name="number" required />
                    <Label className="projectTimeline">Project Timeline</Label>
                    <BaseInputWrapper type="number" name="number" required />
                    <Label className="projectDescription">Project Description</Label>
                    <TextAreaWrapper />
                    <Label className="timelineMilestones">Timeline Milestones</Label>
                    <TextAreaWrapper />
                    <Label className="budgetInformation">Budget Information</Label>
                    <TextAreaWrapper />
                    <BaseButton type="submit">Continue</BaseButton>
                </form>
            </ProjectRegistrationAreaWrapper>
        </Dashboard>
    )
}