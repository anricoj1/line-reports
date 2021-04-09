// react
import React from 'react';


// lineitem
import LineItem from './LineItem';

// css
import '../App.css';


const ThisOrder = ({ data, defaultHeaders, setAppState, appState, setComponent }) => {
    let productArr = [];
    let counts = {}; //init product counts
    let countArr = [];

    // init arrays
    let products = [];
    let included = [];
    
    let flat_prod = data.Products.flat(1); //flaten arrays, get rid of nested arrays
    let flatten = flat_prod.flat(1);
    
    for (let j = 0; j < flatten.length; j++) { //push products
        flatten[j] !== null ? products.push(flatten[j]) : null;
    }
    
    for (let k = 0; k < data.Includes.length; k++) { // push included items
        if (data.Includes[k] !== false) {
            included.push(data.Includes[k]);
        }
    }

    productArr = [products, included.flat(1)].flat(1); //recreate productArr


    for (let i = 0; i < productArr.length; i++) { // counts from productArr
        let lineitem = productArr[i];

        counts[lineitem] = counts[lineitem] ? counts[lineitem] + 1 : 1;
    }

    for (const[key, value] of Object.entries(counts)) { // count arr to display
        countArr.push(new LineItem(value, key));
    }

    const trClass = (status) => { //background color based off status
        if (status === 'Complete') return 'table-success';
        if (status === 'Pending') return 'table-warning';
        if (status === 'Picking' || 'Packing' || 'Staging') return 'table-danger';
    }


    const printOrder = () => {
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
            <div className="thisOrder" id="printable">
                <h1 className="text-center">Order Invoice For {data.Order.User.Name}</h1>
                <button className="btn btn-primary btn-sm" onClick={() => setAppState('Table')}>Back</button>
                <button className="btn btn-danger btn-sm" onClick={() => printOrder()}>Print</button>
                <table className="table">
                    <thead>
                        <tr style={{backgroundColor: '#38A745', color: 'white'}}>
                            {data.Order.Attributes.map((header, i) => (
                                <th key={i}>{header.Key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={trClass(data.Order.User.Status)}>
                        {data.Order.Attributes.map((att, i) => (
                            <td key={i}>{att.Value}</td>
                        ))}
                        </tr>
                    </tbody>
                </table>
                <table className="table">
                    <thead>
                        <tr style={{backgroundColor: '#38A745', color: 'white'}}>
                            {defaultHeaders.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={trClass(data.Order.User.Status)}>
                            <td>{data.Order.User.OrderID}</td>
                            <td>{data.Order.User.Name}</td>
                            <td>{data.Order.User.PhoneNumber}</td>
                            <td>{data.Order.User.PickupLocation}</td>
                            <td>{data.Order.User.Status}</td>
                            <td>{data.Order.User.StartTimeWindow}</td>
                            <td>{data.Order.User.TimeStamp}</td>
                            <td>{data.Order.User.Total}</td>
                            <td>{data.Order.User.TotalProductCount}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table">
                    <thead>
                        <tr style={{backgroundColor: '#38A745', color: 'white'}}>
                            <th>Qty</th>
                            <th>Item</th>
                            <th>Dept</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countArr.map((item, i) => (
                            <tr key={i}>
                                <td>{item.qty}</td>
                                <td>{item.item}</td>
                                <td>{item.dept}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="customer-notes text-center">
                    <h4 className="text-center">Customer Notes</h4>
                    <ul>
                        {data.Notes.map((note, i) => (
                            note !== null ? <li key={i}>{note}</li> : null
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ThisOrder;