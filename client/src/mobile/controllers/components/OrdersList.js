// react
import React from 'react'

// material-ui
import { Divider } from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';


const OrderList = ({ props, orders }) => {

    const handleClick = (order) => props.setState({ state: 1, header: props.state.header, data: order });

    return (
        <div>
            {orders.map((order, i) => (
                <React.Fragment key={i}>
                    <div className="order-card" onTouchStart={() => handleClick(order)} onClick={() => handleClick(order)}>
                        <div className="orderID"><StoreIcon style={{ marginRight: '5px', color: '#003E3C'}}/>{order.User.OrderID}</div>
                        <div className="name">{order.User.Name}</div>
                        <div className="window">{order.User.StartTimeWindow}</div>
                        <div className="status">{order.User.Status}</div>
                    </div>
                    <Divider />
                </React.Fragment>
            ))}
        </div>
    )
}

export default OrderList;