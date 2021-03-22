// react
import React from 'react';

// components
import NewTable from './tables/NewTable';



const Table = ({ orders, arr, setView, setAppState }) => {

    return arr.length > 0 ? <NewTable headers={Object.keys(arr[0])} data={arr} setView={e => setView(e)} setAppState={e => setAppState(e)} /> : <NewTable headers={Object.keys(orders.Result[0])} data={orders.Result} setView={e => setView(e)} setAppState={e => setAppState(e)} />;
}

export default Table;