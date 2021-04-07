// react
import React from 'react';

// components
import ThisOrder from './ThisOrder';


const OrderTable = ({ headers, data, store, setAppState, setComponent }) => {
    const trClass = (status) => {
        if (status === 'Complete') return 'table-success';
        if (status === 'Pending') return 'table-warning';
        if (status === 'Picking' || 'Packing' || 'Staging') return 'table-danger';
    }


    return (
        <div className="order-table">
            <h2 className="text-center">{store} W/ {data.length} Orders</h2>
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i}>{header}</th>
                        ))}
                    </tr>
                    {data.map((order, j) => (
                        <tr className={trClass(order.Order.Status)} key={j} onDoubleClick={() => { setAppState('Order'); setComponent(<ThisOrder data={order} defaultHeaders={headers} setAppState={e => setAppState(e)} setComponent={e => setComponent(e)} />)}}>
                            <td>{order.Order.OrderID}</td>
                            <td>{order.Order.Name}</td>
                            <td>{order.Order.PhoneNumber}</td>
                            <td>{order.Order.PickupLocation}</td>
                            <td>{order.Order.Status}</td>
                            <td>{order.Order.StartTimeWindow}</td>
                            <td>{order.Order.TimeStamp}</td>
                            <td>{order.Order.Total}</td>
                            <td>{order.Order.TotalProductCount}</td>
                        </tr>
                    ))}
                </thead>
            </table>
        </div>
    )
}

export default OrderTable;