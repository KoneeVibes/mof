import { TextAreaWrapper } from "../../components/formfields/textarea/styled";
import { Dashboard } from "../dashboard";
import { ProjectRegistrationAreaWrapper } from "./styled";
import {BaseInputWrapper} from "../../components/formfields/input/styled"
import {BaseButton} from "../../components/buttons/styled"

export const ProjectRegistrationArea = () => {
    return (
        <Dashboard>
            <ProjectRegistrationAreaWrapper>
                {
                <div className="project-details-form-div">
                    <h2>PROJECT DETAILS</h2>
                    <p>PLEASE  ENTER THE PROJECT INFORMATION</p>
                    <form>
                    <label className="projectName">Project Name</label>
                        <BaseInputWrapper type="text" name="text" required />
                    <label className="fundingSource">Funding Source</label>
                        <BaseInputWrapper type="text" name="text" required />
                    <label className="fundingAmount">Funding Amount</label>
                        <BaseInputWrapper type="number" name="number" required />
                    <label className="projectDescription">Project Description</label>
                        <TextAreaWrapper />
                    <label className="timelineMilestones">Timeline Milestones</label>
                        <TextAreaWrapper />
                    <label className="budgetInformation">Budget Information</label>
                        <TextAreaWrapper />
                        <BaseButton type="submit">Continue</BaseButton>
                    </form>
                </div>
                }
            </ProjectRegistrationAreaWrapper>
        </Dashboard>
    )
}