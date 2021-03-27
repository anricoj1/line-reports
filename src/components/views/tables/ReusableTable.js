// react
import React from 'react';

const ReusableTable = ({ headers, data }) => {
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, i) => (
                        <th key={i}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                    {Object.values(data).map((row, j) => (
                        <tr key={j}>
                            <td>{row}</td>
                        </tr>
                    ))}
                </tbody>
        </table>
    )
}

export default ReusableTable;