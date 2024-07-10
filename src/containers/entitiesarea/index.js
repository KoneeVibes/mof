import { Dashboard } from "../dashboard";
import { EntitiesAreaWrapper, EntitiesTableWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron/index";
import { entities } from "../../data";
import { useNavigate } from "react-router-dom";

export const EntitiesArea = () => {
    //The idea is that this component will hold a generic table that can be reused for ministries or parastatals
    //Depending of say the authorization the endpoint will return data that will populate the table
    const navigate = useNavigate();
    const rows = ["Parastatal", "Ongoing Project", "Completed Project", "Amount in N", "Amount in E", "Amount in Dollars", "Projects"];
    const navigateToEntityDetails = (parastatal) => {
        const parsedEntity = parastatal.replace(/\s+/g, '').toLowerCase();
        return navigate(`/entities/${parsedEntity}`);
    }
    return (
        <Dashboard>
            <EntitiesAreaWrapper>
                <Jumbotron />
                <EntitiesTableWrapper>
                    <table>
                        <thead>
                            <tr>
                                {rows.map((row, k) => {
                                    return (
                                        <th key={k}>{row}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {entities.map((entity, k) => {
                                return (
                                    <tr
                                        key={k}
                                        onClick={() => navigateToEntityDetails(entity.parastatal)}
                                    >
                                        <td className="parastatal">{entity.parastatal}</td>
                                        <td>{entity.ongoingProject}</td>
                                        <td>{entity.completedProject}</td>
                                        <td>{entity.nairaAmount}</td>
                                        <td>{entity.poundAmount}</td>
                                        <td>{entity.dollarAmount}</td>
                                        <td>
                                            <label>
                                                {entity.projects}
                                            </label>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </EntitiesTableWrapper>
            </EntitiesAreaWrapper>
        </Dashboard>
    )
}