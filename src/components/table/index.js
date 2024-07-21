import React from "react";
import { Td, Th } from "../typography/styled";

export const Table = ({ columnTitles, onSelectOption, rowItems }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columnTitles.map((rowHead, k) => (
                        <Th key={k}>{rowHead}</Th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rowItems.map((rowItem, k) => (
                    <tr
                        key={k}
                        onClick={(event) => onSelectOption(rowItem?.organization, rowItem?.projectId, event)}
                    >
                        <Td>{rowItem?.title || rowItem?.dateRequested}</Td>
                        <Td>{rowItem?.organization || rowItem?.requester}</Td>
                        {rowItem?.fundings?.map((funding, index) => (
                            <Td key={index}>{funding.amount}</Td>
                        ))}
                        {rowItem.description && (<Td>{rowItem.description}</Td>)}
                        {rowItem.amount && (<Td>{`${rowItem?.currencySymbol + rowItem?.amount}`}</Td>)}
                        <Td>{rowItem?.status || rowItem?.approvalStatus}</Td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
