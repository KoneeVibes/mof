import { useEffect, useState } from "react";
import { Table } from "../../components/table";
import { Dashboard } from "../dashboard";
import { DisbursementsApprovalAreaWrapper } from "./styled";
import { getDisbursementRequests } from "../../util/apis/getDisbursementRequests";
import Cookies from "universal-cookie";
import { Jumbotron } from "../../components/jumbotron";
import { H2 } from "../../components/typography/styled";
import { updateDisbursementStatus } from "../../util/apis/updateDisbursementStatus";

export const DisbursementsApprovalArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const { TOKEN } = cookie;
    // eslint-disable-next-line no-unused-vars
    const [currencies, setCurrencies] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [columns, setColumns] = useState(["Date Requested", "Requester", "Purpose", "Amount", "Action", "Approval Status", "Disbursement Status"]);
    const [requests, setRequests] = useState([]);

    const updateApprovalStatus = async (e, payload) => {
        e.preventDefault();
        try {
            const response = await updateDisbursementStatus(TOKEN, payload);
            if (response.status === "Success") { }
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    useEffect(() => {
        getDisbursementRequests(TOKEN).then((requests) => setRequests(requests));
    }, [TOKEN]);

    return (
        <Dashboard>
            <DisbursementsApprovalAreaWrapper>
                <Jumbotron />
                <H2>Disbursements</H2>
                <div style={{ overflow: "auto" }}>
                    <Table
                        location={"disbursementsApprovalArea"}
                        columnTitles={columns}
                        rowItems={requests}
                        uniqueCurrencies={currencies}
                        updateApprovalStatus={updateApprovalStatus}
                        onSelectOption={(x, y, e) => e.preventDefault()}
                    />
                </div>
            </DisbursementsApprovalAreaWrapper>
        </Dashboard>
    )
}