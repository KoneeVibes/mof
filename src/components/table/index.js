export const Table = ({ rowHeads, rowItems, onSelectProject }) => {
    return (
        <table>
            <thead>
                <tr>
                    {rowHeads.map((rowHead, k) => {
                        return (
                            <th key={k}>{rowHead}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {rowItems.map((rowItem, k) => {
                    return (
                        <tr
                            key={k}
                        >
                            {Object.values(rowItem).map((value, i) => (
                                <td key={i}>
                                    {Array.isArray(value) ? (
                                        <select onChange={(e) => onSelectProject(e.target.value, rowItem.id, e.target.selectedIndex - 1)}>
                                            <option>Select a project</option>
                                            {value.map((project, j) => (
                                                <option key={j} value={project.name}>{project.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        value
                                    )}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}