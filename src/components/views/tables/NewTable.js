// react
import React from 'react';

// components
import Order from '../Order';

// css
import './Table.css';



const NewTable = ({ headers, data, setView, setAppState }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {headers.map((header, i) => (
                        <th key={i}>{header}</th>
                    ))}
                </tr>
                {data.map((order, j) => (
                    <tr key={j}>
                        {Object.values(order).map((row, k) => (
                            <td key={k} onClick={() => { setAppState('Order'); setView(<Order headers={headers} order={order} setAppState={e => setAppState(e)} />)}}>{row}</td>
                        ))}
                    </tr>
                ))}
            </thead>
        </table>
    )
}

export default NewTable;