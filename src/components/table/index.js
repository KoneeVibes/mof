// import React from "react";
// import { Td, Th } from "../typography/styled";

// export const Table = ({ columnTitles, onSelectOption, rowItems }) => {
//     return (
//         <table>
//             <thead>
//                 <tr>
//                     {columnTitles.map((rowHead, k) => (
//                         <Th key={k}>{rowHead}</Th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {rowItems.map((rowItem, k) => (
//                     <tr
//                         key={k}
//                         onClick={(event) => onSelectOption(rowItem?.organization, rowItem?.projectId, event)}
//                     >
//                         <Td>{rowItem?.title || rowItem?.dateRequested}</Td>
//                         <Td>{rowItem?.organization || rowItem?.requester}</Td>
//                         {rowItem?.fundings?.map((funding, index) => (
//                             <Td key={index}>{funding.amount}</Td>
//                         ))}
//                         {rowItem.description && (<Td>{rowItem.description}</Td>)}
//                         {rowItem.amount && (<Td>{`${rowItem?.currencySymbol + rowItem?.amount}`}</Td>)}
//                         <Td>{rowItem?.status || rowItem?.approvalStatus}</Td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

import React from "react";
import { Td, Th } from "../typography/styled";

export const Table = ({ columnTitles, onSelectOption, rowItems }) => {
    // Determine the maximum number of fundings in any rowItem
    const maxFundingsLength = Math.max(...rowItems.map(rowItem => rowItem.fundings ? rowItem.fundings.length : 0));

    return (
        <table>
            <thead>
                <tr>
                    {columnTitles.map((columnTitle, index) => (
                        <Th key={index}>{columnTitle}</Th>
                    ))}
                    {/* Add extra headers for the maximum number of fundings */}
                    {Array.from({ length: maxFundingsLength }, (_, i) => (
                        <Th key={`funding-header-${i}`}>Funding {i + 1}</Th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rowItems.map((rowItem, rowIndex) => (
                    <tr
                        key={rowIndex}
                        onClick={(event) => onSelectOption(rowItem.organization, rowItem.projectId, event)}
                    >
                        <Td>{rowItem.title || rowItem.dateRequested || ''}</Td>
                        <Td>{rowItem.organization || rowItem.requester || ''}</Td>
                        {rowItem.fundings ? rowItem.fundings.map((funding, fundingIndex) => (
                            <Td key={fundingIndex}>{funding.amount}</Td>
                        )) : <Td colSpan={maxFundingsLength}></Td>}
                        {/* Fill in the rest of the fundings columns with empty cells if needed */}
                        {rowItem.fundings && rowItem.fundings.length < maxFundingsLength &&
                            Array.from({ length: maxFundingsLength - rowItem.fundings.length }).map((_, i) => (
                                <Td key={`empty-funding-${rowIndex}-${i}`}></Td>
                            ))
                        }
                        <Td>{rowItem.description || ''}</Td>
                        <Td>{rowItem.amount ? `${rowItem.currencySymbol}${rowItem.amount}` : ''}</Td>
                        <Td>{rowItem.status || rowItem.approvalStatus || ''}</Td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

