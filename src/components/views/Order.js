// react
import React, { useEffect, useState } from 'react';


const Order = ({ headers, order, setAppState }) => {
    const [thisOrder, setThisOrder] = useState([]);

    useEffect(async () => {
        const thisresponse = await fetch(`https://storeapi.grocerkey.com/order/${order.OrderID}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'storeCode': 67879,
                'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
            }
        })

        return setThisOrder(await thisresponse.json());
    },[]);

    return (
        <div>
            <button className="btn btn-danger" onClick={() => setAppState('Table')}>Back To Table</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i}>{header}</th>
                        ))}
                    </tr>
                    <tr>
                        {Object.values(order).map((row, j) => (
                            <td key={j}>{row}</td>
                        ))}
                    </tr>
                </thead>
            </table>
            {thisOrder.length < 1 ? null : console.log(thisOrder)}
        </div>
    )
}

export default Order;