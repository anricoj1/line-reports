// react
import React, { useState } from 'react';

// components
import Navbar from './navbar/Navbar';
import OrderTable from './OrderTable';
import LineReport from './LineReport';

// css
import '../App.css';


const DivComponent = ({ orders, defaultHeaders }) => {
    const [appState, setAppState] = useState('Table'); //init appState
    const [navSelection, setNavSelection] = useState('All Stores'); //navigation selector by store
    const [component, setComponent] = useState(<OrderTable headers={defaultHeaders} data={orders} store={navSelection} setAppState={e => setAppState(e)} setComponent={e => setComponent(e)} />); //mount init {component}
    const [date, setDate] = useState(new Date());
    let arr = [];

    orders.map(order => { //iter orders to query by store
        if (navSelection !== 'All Stores') {
            if (order.Order.StoreName.includes(navSelection)) return arr.push(order)
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
        let newarr = [];

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
                <Navbar setNavSelection={e => setNavSelection(e)} setAppState={e => setAppState(e)} />
            </div>
            <div className="taskbar">
                <h3><small>Canceled Orders Are Omitted</small></h3>
                <ul className="links">
                    <li className="link">
                        <input type="date" value={date} onChange={e => { setDate(e.target.value); setAppState(date) }}></input>
                        <button type="submit" onClick={() => setComponent(<OrderTable headers={defaultHeaders} data={filterByDate(date)} store={navSelection} setAppState={e => setAppState(e)} setComponent={e => setComponent(e)} />)}>Submit</button>
                    </li>
                </ul>
                <li className="link"><button className="btn btn-danger btn-sm" onClick={() => { setAppState('Line-Report'); setComponent(<LineReport orders={filterByDate(date)} date={date} navSelection={navSelection} />)}}>Line Report</button></li>
            </div>
            <div className="component">
                {appState === navSelection || appState === date ? <OrderTable headers={defaultHeaders} data={arr} store={navSelection} setAppState={e => setAppState(e)} setComponent={e => setComponent(e)} /> : component}
            </div>
        </div>
    )
}

export default DivComponent;