// react
import React from 'react';

// components
import OrdersTable from './components/OrdersTable';
import LineReport from './components/LineReport';
import DueList from './components/DueList';
import Order from './components/Order';

// styles
import { tableStyles, modalStyles } from './styles';

// line item
import LineItem from './LineItem'

// material-ui
import { Modal, Fade, Backdrop } from '@material-ui/core';

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


// render based off state 
export const SwitchState = ({ props }) => {

    switch (props.state.state) {
        case 0:
            return <OrdersTable
                props={props}
                classes={tableStyles()}
                data={props.state.header != 'All Stores' ? filterByDate(props.date, filterStore(props.state.header, props.orders)) : filterByDate(props.date, props.orders)}
                headers={['Order #', 'Name', 'Cell', 'Location', 'Status', 'Date & Time Fufillment', 'Date & Time Placed', 'Total', 'Product Count']}
            />
        case 1:
            return <LineReport
                props={props}
                orders={props.state.header != 'All Stores' ? filterByDate(props.date, filterStore(props.state.header, props.orders)) : filterByDate(props.date, props.orders)}
                classes={tableStyles()}
            />
        case 2:
            return <DueList
                props={props}
                orders={props.state.header != 'All Stores' ? filterByDate(props.date, filterStore(props.state.header, props.orders)) : filterByDate(props.date, props.orders)}
                classes={tableStyles()}
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
                <div className={classes.container}>
                    <Order order={modal.data} classes={classes} />
                </div>
            </Fade>
        </Modal>
    )
}

// while waiting for orders, loading
export const Loader = ({ msg }) => {
    return <h2 className="text-center">{msg} <span className="fa fa-circle-notch fa-spin"></span></h2>
}

export class Counter {
    constructor() {
        this.counts = {};
        this.productArr = [];
        this.countArr = [];
        this.products = [];
        this.included = [];
    }

    // count map of products
    handleCounts = (orders) => {
        orders.forEach(order => {
            let flat_prod = order.Products.flat(1);
            let flatten = flat_prod.flat(1);

            // products array
            flatten.forEach(flat => flat !== null ? this.products.push(flat) : null);

            // included items
            order.Includes.forEach(includedItem => includedItem !== false ? this.included.push(includedItem) : null);
        });

        // merge and flatten
        this.productArr = [this.products, this.included.flat(1)].flat(1);

        // to map
        this.productArr.forEach(lineitem => this.counts[lineitem] = this.counts[lineitem] ? this.counts[lineitem] + 1 : 1);

        // to array to display
        Object.entries(this.counts).forEach(([key, value]) => this.countArr.push(new LineItem(value, key)));

        return this.countArr;
    }

    // counts for order invoice
    handleOrderCounts = (order) => {
        let flat_prod = order.Products.flat(1) // flatten product array
        let flatten = flat_prod.flat(1);

        // products array
        flatten.forEach(flat => flat !== null ? this.products.push(flat) : null);

        // included items
        order.Includes.forEach(includedItem => includedItem !== false ? this.included.push(includedItem) : null);

        // merge and flatten
        this.productArr = [this.products, this.included.flat(1)].flat(1);

        // to map
        this.productArr.forEach(lineitem => this.counts[lineitem] = this.counts[lineitem] ? this.counts[lineitem] + 1 : 1);

        // to array to display
        Object.entries(this.counts).forEach(([key, value]) => this.countArr.push(new LineItem(value, key)));

        return this.countArr;
    }


    printThis = (div) => {
        let tablestyle = '' +
            '<style type="text/css">' +
            'table {width: 100%; padding: 0px 50px 0px 50px; }' +
            'h1 { font-size: 30px; }' +
            'h2 { font-size: 30px; }' +
            'h3 { font-size: 30px; text-align: center; }' +
            'h4 { font-size: 20px; }' +
            'ul { font-size: 20px;}' +
            'li { font-size: 20px; list-style: none;}' +
            'table th, table td, table tr { border: 1px solid black; font-size: 15px; font-weight: bold; padding: 5px;}' + 
            'thead { background: #003E3C; color: white; }' + 
            'div { margin-bottom: 100px; border: 1px solid black }' +
            '</style>';

        tablestyle += div.outerHTML;

        let newWin = window.open('');
        newWin.document.write(tablestyle);
        newWin.document.close();
        newWin.print();

        return;
    }
}