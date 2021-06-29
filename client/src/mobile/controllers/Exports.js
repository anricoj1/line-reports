// react
import React from 'react';

// components
import OrderList from './components/OrdersList';
import Order from './components/Order';
import { Sort, Filter, Search } from './Modals';

// material-ui
import { Modal, Fade, Backdrop } from '@material-ui/core';

// styles
import { modalStyles } from './styles';


// render based off state 
export const SwitchState = ({ props }) => {

    switch (props.state.state) {
        case 0:
            return <OrderList
                props={props}
                orders={props.state.header != 'All Stores' ? filterByDate(props.date, filterStore(props.state.header, props.orders)) : filterByDate(props.date, props.orders)}
            />
        case 1:
            return <Order
                props={props}
             />
        default:
            return <div>There Was An Error In The Application, This was Displayed to Prevent The Application from crashing</div>
    }
}

// render modal
export const ModalRenderer = ({ setModal, modal }) => {
    // hide modal
    const hide = () => setModal({ state: false, data: null });

    // classes
    let classes = modalStyles();

    return (
        <Modal
            className={classes.modal}
            open={modal.state}
            onClose={hide}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={modal.state} timeout={1000}>
                <React.Fragment>
                    <ModalSwitch modal={modal} classes={classes} />
                </React.Fragment>
            </Fade>
        </Modal>
    )
}


const ModalSwitch = ({ modal, classes }) => {
    switch (modal.name) {
        case "Sort":
            return <Sort
                classes={classes}
            />
        case "Filter":
            return <Filter
                classes={classes}
            />
        case "Search":
            return <Search
                classes={classes}
            />
        default:
            return <div></div>
    }
}


// while waiting for orders, loading
export const Loader = ({ msg }) => {
    return <h2 style={{ marginTop: '80px' }} className="text-center">{msg} <span className="fa fa-circle-notch fa-spin"></span></h2>
}

// store name ? filter, no store? return new Array
export const filterStore = (pageHeader, orders) => {
    return pageHeader !== 'All Stores' ? filter(orders, pageHeader) : new Array(orders);
}

// if order storeName matches pageHeader, return that list
const filter = (orders, pageHeader) => {
    return orders.filter(order => order.User.StoreName.includes(pageHeader) ? new Array(orders) : null);
}

// fetch Order from search box
export const fetchOrderId = async (id, setModal, setOrder) => await fetch(`/order/${id.value}`).then(res => res.json()).then(data => {
    !data.error ? setModal({ state: true, data: data }) : setOrder({ value: id.value, error: true });
});


// fetch order from onClick event
export const fetchOrder = async (id, setModal) => await fetch(`/order/${id}`).then(res => res.json()).then(data => setModal({
    state: true,
    data: data
}));


// filter Orders by date
export const filterByDate = (date, orders) => {
    let arr = [];

    date === '' ? arr = orders : orders.map(order => {
        let orderDate = new Date(order.User.StartTimeWindow).toISOString().substring(0, 10);
        let selectedDate = new Date(date).toISOString().substring(0, 10);

        orderDate === selectedDate ? arr.push(order) : null;
    });

    return arr;
}