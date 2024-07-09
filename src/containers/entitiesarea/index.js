import { Dashboard } from "../dashboard";
import { EntitiesAreaWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron/index";

export const EntitiesArea = () => {
    //The idea is that this component will hold a generic table that can be reused for ministries or parastatals
    //Depending of say the authorization the endpoint will return data that will populate the table
    return (
        <Dashboard>
            <EntitiesAreaWrapper>
                <Jumbotron />
                <table>
                    {/* Ofofon, code for the table goes under here */}








                    
                </table>
            </EntitiesAreaWrapper>
        </Dashboard>
    )
}