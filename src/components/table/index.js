import React, { useEffect, useState } from "react";
import { Td, Th } from "../typography/styled";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";

export const Table = ({ columnTitles, onSelectOption, rowItems, uniqueCurrencies, location, updateApprovalStatus }) => {
    // eslint-disable-next-line no-unused-vars
    const [statuses, setStatuses] = useState(["Approve", "Disapprove"]);
    const [activeStatus, setActiveStatus] = useState([]);

    useEffect(() => {
        const initialStatuses = rowItems.map(() => ({ requestId: "", option: "" }));
        setActiveStatus(initialStatuses);
    }, [rowItems]);

    const handleChange = (e, requestId, rowIndex) => {
        const { name, value } = e.target;
        const updatedStatuses = activeStatus.map((status, index) =>
            index === rowIndex ? { ...status, requestId, [name]: value } : status
        );
        setActiveStatus(updatedStatuses);
        return updateApprovalStatus(e, updatedStatuses[rowIndex]);
    };

    return (
        <table>
            <thead>
                <tr>
                    {columnTitles?.map((columnTitle, index) => (
                        <Th key={index}>{columnTitle}</Th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rowItems?.map((rowItem, rowIndex) => (
                    <tr
                        key={rowIndex}
                        onClick={(event) => onSelectOption(rowItem.organization, rowItem.projectId, event)}
                    >
                        <Td>{rowItem.title || rowItem.dateRequested || ''}</Td>
                        <Td>{rowItem.organization || rowItem.requester || ''}</Td>
                        {(location === "detailsArea" || location === "disbursementsApprovalArea") && (
                            <React.Fragment>
                                <Td>{rowItem.purpose}</Td>
                                {uniqueCurrencies.length > 1 ? uniqueCurrencies.map((_, index) => (
                                    <Td key={index}>{rowItem.currencySymbol}{rowItem.amount}</Td>
                                )) : <Td>{rowItem.currencySymbol}{rowItem.amount}</Td>}
                            </React.Fragment>
                        )}
                        {(location === "projectsTableArea") && (uniqueCurrencies?.map((currency, index) => {
                            const funding = rowItem.fundings.find(f => f.currencyName === currency);
                            return <Td key={index}>{funding ? funding.amount : ''}</Td>;
                        }))}
                        {location === "disbursementsApprovalArea" && (
                            <Td>
                                <SelectFieldWrapper
                                    as="select"
                                    name="option"
                                    value={activeStatus[rowIndex]?.option || ""}
                                    onChange={(e) => handleChange(e, rowItem.requestId, rowIndex)}
                                >
                                    <option value="">Status</option>
                                    {statuses.map((status, key) => (
                                        <option key={key} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </SelectFieldWrapper>
                            </Td>
                        )}
                        <Td>
                            {rowItem.status || rowItem.approvalStatus || ''}
                        </Td>
                        {location === "disbursementsApprovalArea" && (
                            <Td>
                                {rowItem?.disbursementStatus}
                            </Td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
