// react
import React from 'react';

// components
import ThisOrder from './ThisOrder';


const OrderTable = ({ headers, data, store, setAppState, appState, setComponent }) => {
    const trClass = (status) => {
        if (status === 'Complete') return 'table-success';
        if (status === 'Pending') return 'table-warning';
        if (status === 'Picking' || 'Packing' || 'Staging') return 'table-danger';
    }


    return (
        <div>
            <div className="store-selection">
                <h2 className="text-center">{store} W/ {data.length} Orders</h2>
            </div>
            <div className="order-table">
                <table className="table">
                    <thead>
                        <tr>
                            {headers.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))}
                        </tr>
                        {data.map((order, j) => (
                            <tr className={trClass(order.Order.User.Status)} key={j} onDoubleClick={() => { setAppState('This-Order'); setComponent(<ThisOrder data={order} defaultHeaders={headers} setAppState={e => setAppState(e)} appState={appState} setComponent={e => setComponent(e)} />)}}>
                                <td>{order.Order.User.OrderID}</td>
                                <td>{order.Order.User.Name}</td>
                                <td>{order.Order.User.PhoneNumber}</td>
                                <td>{order.Order.User.PickupLocation}</td>
                                <td>{order.Order.User.Status}</td>
                                <td>{order.Order.User.StartTimeWindow}</td>
                                <td>{order.Order.User.TimeStamp}</td>
                                <td>{order.Order.User.Total}</td>
                                <td>{order.Order.User.TotalProductCount}</td>
                            </tr>
                        ))}
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default OrderTable;