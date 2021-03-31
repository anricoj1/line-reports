// react
import React, { useState } from 'react';

// components
import Navbar from './navbar/Navbar';
import OrderTable from './OrderTable';
import Taskbar from './Taskbar';

// css
import '../App.css';



const DivComponent = ({ orders, defaultHeaders }) => {
    const [appState, setAppState] = useState('Table'); //init appState
    const [navSelection, setNavSelection] = useState('All Stores'); //navigation selector by store
    const [component, setComponent] = useState(<OrderTable headers={defaultHeaders} data={orders} store={navSelection} setAppState={e => setAppState(e)} setComponent={e => setComponent(e)} />); //mount init {component}
    const [date, setDate] = useState(new Date());
    let arr = [];
    let newarr = [];

    orders.map(order => { //iter orders to query by store
        if (navSelection !== 'All Stores') {
            if (order.Order.Status !== 'Complete') {
                if (order.Order.StoreName.includes(navSelection)) return arr.push(order)
            }
        } else {
            arr = orders;
        }
    });


    const convertDate = (date) => { // convert date to remove trailning 0's (04/04/2021)
        if ((date.substring(3, 4) === '0') && (date.substring(0, 1) === '0')) {
            return `${date.substring(1, 2)}/${date.substring(4, 5)}/${date.substring(6, 10)}`
        }
    }


    const filterByDate = (date) => { //filter by date push to (newarr) & return
        arr.map(order => {
            let orderDate = order.Order.StartTimeWindow.toString().substring(0, 9);
            let selectorDate = `${date.toString().substring(5, 7)}/${date.toString().substring(8, 10)}/${date.toString().substring(0, 4)}`;

            if (orderDate.includes(convertDate(selectorDate))) return newarr.push(order);
        });

        return newarr;
    }


    return (
        <div className="App">
            <div className="navbar navbar-expand-lg navbar-dark bg-success">
                <Navbar setNavSelection={e => setNavSelection(e)} setAppState={e => setAppState(e)} date={date} />
            </div>
            <div className="taskbar">
                <Taskbar setComponent={e => setComponent(e)} setDate={e => setDate(e)} date={date} defaultHeaders={defaultHeaders} filterByDate={e => filterByDate(e)} newarr={newarr} navSelection={navSelection} setAppState={e => setAppState(e)} />
            </div>
            <div className="component">
                {appState === navSelection || appState === date || appState === 'Table' ? <OrderTable headers={defaultHeaders} data={arr} store={navSelection} setAppState={e => setAppState(e)} setComponent={e => setComponent(e)} /> : component}
            </div>
        </div>
    )
}

export default DivComponent;