import React from "react";
import { Td, Th } from "../typography/styled"

export const Table = ({ columnTitles, onSelectOption, options, rowItems, isBudgetTable }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columnTitles.map((rowHead, k) => {
                        return (
                            <Th key={k}>{rowHead}</Th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {rowItems.map((subOrganization, k) => (
                    <tr key={k}>
                        {(isBudgetTable) ? (
                            Object.values(subOrganization).map((value, i) => (
                                <Td key={i}>
                                    {value}
                                </Td>
                            ))
                        ) : (
                            <React.Fragment>
                                <Td>{subOrganization.name}</Td>
                                <Td>{/* */}</Td>
                                <Td>{/* */}</Td>
                                <Td>{/* */}</Td>
                                <Td>{/* */}</Td>
                                <Td>{/* */}</Td>
                            </React.Fragment>
                        )}
                        {options && (
                            <Td>
                                <select
                                    onChange={(e) => onSelectOption(e.target.value, subOrganization.id)}
                                >
                                    <option>Select a project</option>
                                    {options[subOrganization.id]?.map((project, j) => (
                                        <option key={j} value={project.title}>{project.title}</option>
                                    ))}
                                </select>
                            </Td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
