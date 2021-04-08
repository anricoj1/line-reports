// react
import React from 'react';

// components
import ThisOrder from './ThisOrder';
 
const DueList = ({ orders, date, navSelection, setAppState, appState, defaultHeaders, setComponent }) => {
    const printList = () => {
        let order = document.getElementById('printable');
        let style = '' +
        '<style type="text/css">' +
        'table {width: 100%; padding: 0px 50px 0px 50px; }' +
        'h1 { font-size: 15px; }' +
        'h2 { font-size: 15px; }' +
        'h3 { font-size: 10px; }' +
        'h4 { font-size: 10px; }' +
        'ul { font-size: 10px;}' +
        'li { font-size: 10px ;}' +
        'table th, table td, table tr { border: 1px solid black; font-size: 10px; font-weight: bold; padding: 2px }' +
        '</style>';


        style += order.outerHTML;

        let newWin = window.open('');
        newWin.document.write(style);
        newWin.document.close();
        newWin.print();
    }

    return (
        <div>
            <button className="btn btn-danger btn-sm" onClick={() => printList()}>Print</button>
            <button className="btn btn-primary btn-sm" onClick={() => setAppState('Table')}>Back</button>
            <div className="DueList" id="printable">
                {orders.map((order, i) => (
                    <div className="order" key={i} onDoubleClick={() => { setAppState('Order'); setComponent(<ThisOrder data={order} defaultHeaders={defaultHeaders} setAppState={e => setAppState(e)} appState={appState} setComponent={e => setComponent(e)} />)}}>
                        <ThisOrder data={order} defaultHeaders={defaultHeaders} setAppState={e => setAppState(e)} appState={appState} setComponent={e => setComponent(e)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DueList;