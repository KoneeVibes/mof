import { Td, Th } from "../typography/styled"

export const Table = ({ columnTitles, onSelectOption, options, rowItems }) => {
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
                        {Object.values(subOrganization).map((value, i) => (
                            <Td key={i}>
                                {value}
                            </Td>
                        ))}
                        {options && (
                            <Td>
                                <select onChange={(e) => onSelectOption(e.target.value, e.target.selectedIndex - 1)}>
                                    <option>Select a project</option>
                                    {options.map((project, j) => (
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
