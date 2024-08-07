import React from "react";
import { Td, Th } from "../typography/styled";
import { BaseButton } from "../../components/buttons/index";

export const Table = ({ categories, columnTitles, onSelectOption, rowItems, uniqueCurrencies, location, role, performAction, exportToExcel }) => {
    return (
        <React.Fragment>
            <div className="exportButton">
                <BaseButton
                    width={"fit-content"}
                    onClick={exportToExcel}
                >
                    Export to Excel
                </BaseButton>
            </div>
            <div className="tableWrapper">
                <table>
                    <thead>
                        {(location === "dataOverviewArea" || location === "projectsTableArea") ? (
                            <React.Fragment>
                                <tr>
                                    {categories?.map((category, index) => (
                                        <Th
                                            key={index}
                                            colSpan={(category === "Fundings" || category === "Allocation" || category === "Funding Balance") ? uniqueCurrencies?.length : 1}
                                            style={{
                                                textAlign: (category === "Fundings" || category === "Allocation" || category === "Funding Balance") ? "center" : "left",
                                                border: "1px solid rgba(33, 63, 125, 0.10)",
                                            }}
                                        >
                                            {category}
                                        </Th>
                                    ))}
                                </tr>
                                <tr>
                                    {(location === "dataOverviewArea") ? (
                                        <React.Fragment>
                                            {/* Empty cell for "Project Title" and "MDA" */}
                                            <Th colSpan={role === "SuperAdmin" ? 2 : 1}></Th>
                                            {["Allocation", "Funding Balance"].map(category => uniqueCurrencies?.map((currency, index) => (
                                                <Th
                                                    key={index}
                                                    style={{
                                                        textAlign: "center",
                                                        border: "1px solid rgba(33, 63, 125, 0.10)"
                                                    }}
                                                >
                                                    {currency}
                                                </Th>
                                            )))}
                                            {/* Empty cell for "Project Status" */}
                                            <Th></Th>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {/* Empty cell for "Project Title" */}
                                            <Th></Th>
                                            {uniqueCurrencies?.map((currency, index) => (
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
                                        </React.Fragment>
                                    )}
                                </tr>
                            </React.Fragment>
                        ) : (
                            // handle the disbursements area
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
                                <Td>{rowItem.title || rowItem.dateDisbursed || rowItem.projectTitle || ""}</Td>
                                {(location === "detailsArea") && (
                                    <React.Fragment>
                                        <Td>{rowItem.creator}</Td>
                                        <Td>{rowItem.purpose}</Td>
                                        {uniqueCurrencies.length > 1 ? uniqueCurrencies.map((_, index) => (
                                            <Td key={index}>{rowItem.currencySymbol}{new Intl.NumberFormat().format(rowItem.amountDisbursed)}</Td>
                                        )) : <Td>{rowItem.currencySymbol}{new Intl.NumberFormat().format(rowItem.amountDisbursed)}</Td>}
                                        <Td>{rowItem?.disbursementStatus || ''}</Td>
                                        {(role === "Individual") && (
                                            <Td style={{ color: "red" }} onClick={(e) => performAction(e, rowItem.disbursementId)}>Delete</Td>
                                        )}
                                    </React.Fragment>
                                )}
                                {location === "projectsTableArea" && (
                                    <React.Fragment>
                                        {uniqueCurrencies?.map((currency, index) => {
                                            const funding = rowItem.fundings.filter(f => f.currencyName === currency).reduce((total, funding) => total + funding.amount, 0);
                                            return (
                                                <Td key={index} style={{ textAlign: "center" }}>{funding ? new Intl.NumberFormat().format(funding) : ''}</Td>
                                            );
                                        })}
                                        <Td>{rowItem.status || ''}</Td>
                                    </React.Fragment>
                                )}
                                {location === "dataOverviewArea" && (
                                    <React.Fragment>
                                        {role === "SuperAdmin" && <Td>{rowItem.organization}</Td>}
                                        {rowItem.totalAllocations.map((allocation, index) => (
                                            <Td key={index} style={{ textAlign: "center" }}>
                                                {new Intl.NumberFormat().format(allocation.amountAllocated) || ""}
                                            </Td>
                                        ))}
                                        {rowItem.totalAllocations.map((allocation, index) => (
                                            <Td key={index} style={{ textAlign: "center" }}>
                                                {new Intl.NumberFormat().format(allocation.balance) || ""}
                                            </Td>
                                        ))}
                                        <Td>{rowItem.status || ""}</Td>
                                    </React.Fragment>
                                )}
                            </tr>
                        ))}
                        {location === "dataOverviewArea" && (
                            <tr>
                                <Td style={{ fontWeight: 600 }}>Total</Td>
                                {/* Empty cell for organization name */}
                                {role === "SuperAdmin" && <Td></Td>}
                                {/* Sum total allocation for each unique currency */}
                                {uniqueCurrencies?.map((uniqueCurrency) => {
                                    // Initialize a sum variable
                                    let currencyTotal = 0;
                                    // Loop through rowItems and sum the totalAllocations for the current uniqueCurrency
                                    rowItems?.forEach((rowItem) => {
                                        rowItem?.totalAllocations?.forEach((totalAllocation) => {
                                            if (totalAllocation.currencyName === uniqueCurrency) {
                                                currencyTotal += totalAllocation.amountAllocated;
                                            }
                                        });
                                    });
                                    // Return the <Td> element with the summed total for the currency
                                    return (
                                        <Td key={uniqueCurrency} style={{ textAlign: "center", fontWeight: 600 }}>{new Intl.NumberFormat().format(currencyTotal)}</Td>
                                    );
                                })}
                                {/* Sum total balance for each unique currency */}
                                {uniqueCurrencies?.map((uniqueCurrency) => {
                                    // Initialize a sum variable
                                    let currencyTotal = 0;
                                    // Loop through rowItems and sum the balance for the current uniqueCurrency
                                    rowItems?.forEach((rowItem) => {
                                        rowItem?.totalAllocations.forEach((totalAllocation) => {
                                            if (totalAllocation.currencyName === uniqueCurrency) {
                                                currencyTotal += totalAllocation.balance;
                                            }
                                        });
                                    });
                                    // Return the <Td> element with the summed total for the currency
                                    return (
                                        <Td key={uniqueCurrency} style={{ textAlign: "center", fontWeight: 600 }}>{new Intl.NumberFormat().format(currencyTotal)}</Td>
                                    );
                                })}
                            </tr>
                        )}
                    </tbody>
                </table >
            </div>
        </React.Fragment>
    );
};
