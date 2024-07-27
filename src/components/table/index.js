import React from "react";
import { Td, Th } from "../typography/styled";

export const Table = ({ categories, columnTitles, onSelectOption, rowItems, uniqueCurrencies, location }) => {
    return (
        <table>
            <thead>
                {(location === "projectsTableArea") ? (
                    <React.Fragment>
                        <tr>
                            {categories?.map((category, index) => (
                                <Th
                                    key={index}
                                    colSpan={category === "Fundings" ? uniqueCurrencies.length : 1}
                                    style={{
                                        textAlign: category === "Fundings" ? "center" : "left",
                                        borderBottom: "none",
                                    }}
                                >
                                    {category}
                                </Th>
                            ))}
                        </tr>
                        <tr>
                            {/* Empty cell for "Project Title" */}
                            <Th></Th>
                            {uniqueCurrencies.map((currency, index) => (
                                <Th
                                    key={index}
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    {currency}
                                </Th>
                            ))}
                            {/* Empty cell for "Project Status" */}
                            <Th></Th>
                        </tr>
                    </React.Fragment>
                ) : (
                    <tr>
                        {columnTitles?.map((columnTitle, index) => (
                            <Th key={index}>{columnTitle}</Th>
                        ))}
                    </tr>
                )}

            </thead>
            <tbody>
                {rowItems?.map((rowItem, rowIndex) => (
                    <tr
                        key={rowIndex}
                        onClick={(event) => onSelectOption(rowItem.organization, rowItem.projectId, event)}
                    >
                        <Td>{rowItem.title || rowItem.dateDisbursed}</Td>
                        {(location === "detailsArea") && (
                            <React.Fragment>
                                <Td>{rowItem.creator}</Td>
                                <Td>{rowItem.purpose}</Td>
                                {uniqueCurrencies.length > 1 ? uniqueCurrencies.map((_, index) => (
                                    <Td key={index}>{rowItem.currencySymbol}{new Intl.NumberFormat().format(rowItem.amountDisbursed)}</Td>
                                )) : <Td>{rowItem.currencySymbol}{new Intl.NumberFormat().format(rowItem.amountDisbursed)}</Td>}
                            </React.Fragment>
                        )}
                        {(location === "projectsTableArea") && (uniqueCurrencies?.map((currency, index) => {
                            const funding = rowItem.fundings.filter(f => f.currencyName === currency).reduce((total, funding) => total + funding.amount, 0);
                            return <Td key={index} style={{ textAlign: "center" }}>{funding ? new Intl.NumberFormat().format(funding) : ''}</Td>;
                        }))}
                        <Td>
                            {rowItem.status || rowItem?.disbursementStatus || ''}
                        </Td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
