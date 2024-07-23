import React from "react";
import { Td, Th } from "../typography/styled";

export const Table = ({ columnTitles, onSelectOption, rowItems, uniqueCurrencies, location }) => {
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
                        {
                            (location === "detailsArea") && (
                                <React.Fragment>
                                    <Td>{rowItem.purpose}</Td>
                                    {uniqueCurrencies.length > 1 ? uniqueCurrencies.map((_, index) => (
                                        <Td key={index}>{rowItem.currencySymbol}{rowItem.amount}</Td>
                                    )) : <Td>{rowItem.currencySymbol}{rowItem.amount}</Td>}
                                </React.Fragment>
                            )
                        }
                        {(location === "projectsTableArea") && (uniqueCurrencies?.map((currency, index) => {
                            const funding = rowItem.fundings.find(f => f.currencyName === currency);
                            return <Td key={index}>{funding ? funding.amount : ''}</Td>;
                        }))}
                        <Td>{rowItem.status || rowItem.approvalStatus || ''}</Td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
