// react
import React, { useState } from 'react';

// components
import Table from './views/Table';



const Div = ({ navselection, orders, appState, setAppState }) => {
    var arr = [];
    const [view, setView] = useState(null);



    orders.Result.map(order => {
        if (navselection !== 'All Stores') {
            if (order.StoreName.includes(navselection)) return arr.push(order);
        } else {
            return arr = orders.Result;
        }
    });

    return (
        <div className="div">
            {appState === 'Table' ? <Table orders={orders} arr={arr} setView={e => setView(e)} setAppState={e => setAppState(e)} /> : view}
        </div>
    )
}

export default Div;