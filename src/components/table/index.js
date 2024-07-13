export const Table = ({ columnTitles, onSelectOption, options, rowItems }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columnTitles.map((rowHead, k) => (
                        <th key={k}>{rowHead}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rowItems.map((subOrganization, k) => (
                    <tr key={k}>
                        {Object.values(subOrganization).map((value, i) => (
                            <td key={i}>
                                {value}
                            </td>
                        ))}
                        {options && (
                            <td>
                                <select onChange={(e) => onSelectOption(e.target.value, e.target.selectedIndex - 1)}>
                                    <option>Select a project</option>
                                    {options.map((project, j) => (
                                        <option key={j} value={project.title}>{project.title}</option>
                                    ))}
                                </select>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
