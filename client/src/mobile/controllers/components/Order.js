// react
import React, { useState } from 'react';

// mui
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';


const Order = ({ props }) => {
    // deconstruct state from props
    const { state } = props;

    // option
    const [option, setOption] = useState(0);

    return (
        <div className="invoice">
            <ul>
                <li onClick={() => setOption(0)}>Overview</li>
                <li onClick={() => setOption(1)}>Products</li>
            </ul>
            {option === 0 ? <Overview order={state.data} /> : <Products order={state.data} />}
        </div>
    );
}

const Overview = ({ order }) => {
    return (
        <div className="orderview">
            <div id="info">
                <div>
                    <div className="tag">Order #</div>
                    <span>{order.User.OrderID}</span>
                </div>
                <div>
                    <div className="tag">Status</div>
                    <span className="stat">{order.User.Status}</span>
                </div>
                <div>
                    <div className="tag">Mode</div>
                    <span>{order.User.Mode}</span>
                </div>
            </div>
            <hr />
            <List style={{ marginTop: '50px' }}>
                <ListItem>
                    <ListItemText primary="Time Window" />
                    <ListItemText primary={order.User.StartTimeWindow} style={{ textAlign: 'right' }} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Phone Number" />
                    <ListItemText primary={order.User.PhoneNumber} style={{ textAlign: 'right', color: 'orange' }} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Store" />
                    <ListItemText primary={order.User.PickupLocation} style={{ textAlign: 'right', color: 'orange' }} />
                </ListItem>
                <Divider />
                {order.Attributes.map((text, i) => (
                    <React.Fragment key={i}>
                        <ListItem>
                            <ListItemText primary={text.Key} />
                            <ListItemText primary={text.Value} style={{ textAlign: 'right' }} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </div>
    )
}

const Products = ({ order }) => {
    return (
        <div className="products">
            <div className="product-list">
                <b>Products</b>
                <Divider />
                <List>
                    {order.Products.map((product, i) => (
                        <React.Fragment key={i}>
                            <ListItem>
                                <ListItemText primary={product} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </div>
            <div className="included-list">
                <b>Included</b>
                <Divider />
                <List>
                    {order.Includes.map((includedItem, j) => (
                        includedItem === false ? null : <React.Fragment key={j}>
                            <ListItem>
                                <ListItemText primary={includedItem} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
        </div>
        </div >
    )
}

export default Order;