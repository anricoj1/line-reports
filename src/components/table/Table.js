// react
import React from 'react';



const Table = ({ headers, data }) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    {headers.map((header, i) => (
                        <th key={i}>{header}</th>
                    ))}
                </tr>
                {data.map((order, j) => (
                    <tr key={j}>
                        {Object.values(order).map((row, k) => (
                            <td key={k}>{row}</td>
                        ))}
                    </tr>
                ))}
            </thead>
        </table>
    )
}

export default Table;