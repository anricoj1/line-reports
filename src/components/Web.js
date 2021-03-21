// react
import React from 'react';

// components
import Table from './table/Table';

// css
import './App.css';


const Web = ({ windowSize, orders }) => {
    return (
        <div className="Web">
            <div className="container">
                {orders.length < 1 ? null : <Table headers={Object.keys(orders.Result[0])} data={orders.Result} />}
            </div>
        </div>
    )
}

export default Web;