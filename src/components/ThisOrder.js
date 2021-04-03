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

    // set arrays to flatten
    let options = [];
    let included = [];
    let main = [];

    for (let j = 0; j < data.Included.length; j++) { //included
        if (data.Included[j] !== false) {
            included.push(data.Included[j]);
        } 
    }

    for (let k = 0; k < data.Options.length; k++) { //options
        if (data.Options[k].length > 0) {
            data.Options[k].forEach(option => {
                options.push(option.Value);
            });
        } 
    }

    for (let l = 0; l < data.Main.length; l++) { // main dishes
        main.push(data.Main[l])
    }


    productArr = [main, options, included.flat(1)].flat(1); // reset product arr to flat array
    

    for (let i = 0; i < productArr.length; i++) {
        let lineitem = productArr[i];

        counts[lineitem] = counts[lineitem] ? counts[lineitem] + 1 : 1;
    }

    for (const[key, value] of Object.entries(counts)) {
        countArr.push(new LineItem(value, key));
    }

    return (
        <div className="thisOrder">
            <button className="btn btn-danger btn-sm" onClick={() => setAppState('Table')}>Back To Table</button>
            <table className="table">
                <thead>
                    <tr>
                        {defaultHeaders.map((header, i) => (
                            <th key={i}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.Order.OrderID}</td>
                        <td>{data.Order.Name}</td>
                        <td>{data.Order.PhoneNumber}</td>
                        <td>{data.Order.PickupLocation}</td>
                        <td>{data.Order.Status}</td>
                        <td>{data.Order.StartTimeWindow}</td>
                        <td>{data.Order.TimeStamp}</td>
                        <td>{data.Order.Total}</td>
                        <td>{data.Order.TotalProductCount}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table">
                <thead>
                    <tr>
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
        </div>
    )
}

export default ThisOrder;