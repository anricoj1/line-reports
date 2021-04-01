// react
import React from 'react';

// components
import ThisOrder from './ThisOrder';

const DueList = ({ orders, date, navSelection, setAppState, defaultHeaders, setComponent }) => {
    return (
        <div className="DueList">
            <button className="btn btn-danger btn-sm" onClick={() => setAppState('Table')}>Back</button>
            {orders.map((order, i) => (
                <div className="order" key={i} onDoubleClick={() => { setAppState('Order'); setComponent(<ThisOrder data={order} defaultHeaders={defaultHeaders} setAppState={e => setAppState(e)} setComponent={e => setComponent(e)} />)}}>
                    <ThisOrder data={order} defaultHeaders={defaultHeaders} setAppState={e => setAppState(e)} setComponent={e => setComponent(e)} />
                </div>
            ))}
        </div>
    )
}

export default DueList;