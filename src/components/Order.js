// react
import React from 'react';


const Order = ({ order, setAppState }) => {
    console.log(order);
    return (
        <div className="Order">
            <button className="btn btn-danger btn-sm" onClick={() => setAppState('Table')}>Back</button>
        </div>
    )
}

export default Order;