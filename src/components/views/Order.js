// react
import React, { useEffect, useState } from 'react';
// css
import './Order.css';


const Order = ({ headers, order, setAppState }) => {
    const [thisOrder, setThisOrder] = useState({});

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
        });

        return setThisOrder(await thisresponse.json());
    },[]);

    if (thisOrder.OrderID === undefined) {
        return <div />
    } else {
        return (
            <div>
                <button className="btn btn-danger btn-sm" onClick={() => setAppState('Table')}>Back To Table</button>
                <hr />
                <h2>Cateing Invoice</h2>
                <ul className="flex-invoice">
                    <li>Order # {thisOrder.OrderID}</li>
                    <li>Modification Window: {thisOrder.ModificationCutOff}</li>
                    <li>Fufillment Window: {thisOrder.FulfillmentWindow}</li>
                </ul>
                <div className="customer-info">
                <div className="customer-header">Customer Info</div>
                    <table className="table">
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
                </div>
                <div className="location-time">
                    <div className="location-header">Location And Times</div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Pickup Store</th>
                                <th>Pickup Location</th>
                                <th>Pickup Time</th>
                                <th>Type</th>
                            </tr>
                            <tr>
                                <td>{thisOrder.FulfillmentOption.Name}</td>
                                <td>{thisOrder.OrderAttributes[0].Key}</td>
                                <td>{thisOrder.OrderAttributes[0].Value}</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        )
    }
}

export default Order;