// react
import React from 'react';


// components
import Table from './views/Table';
import TaskBar from './taskbar/TaskBar';



const Div = ({ navselection, orders, appState, setAppState, view, setView }) => {
    let arr = [];

    orders.Result.map(order => {
        if (navselection !== 'All Stores') {
            if (order.StoreName.includes(navselection)) return arr.push(order);
        } else {
            return arr = orders.Result;
        }
    });

    return (
        <div>
            <h1 className="text-center">Orders In {navselection}</h1>
            {arr.length < 1 ? null : <TaskBar navselection={navselection} setView={e => setView(e)} setAppState={e => setAppState(e)} appState={appState} orders={arr} />}
            <div className="div">
                {appState === 'Table' ? <Table orders={orders} arr={arr} setView={e => setView(e)} setAppState={e => setAppState(e)} /> : view}
            </div>
        </div>
    )
}

export default Div;