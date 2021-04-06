// react
import React from 'react';


// lineitem
import LineItem from './LineItem';

// css
import '../App.css';


const ThisOrder = ({ data, defaultHeaders, setAppState, setComponent }) => {
    let productArr = [];
    let counts = {}; //init product counts
    let countArr = [];

    let products = [];
    let included = [];
    
    let flat_prod = data.Products.flat(1);
    let flatten = flat_prod.flat(1);
    
    for (let j = 0; j < flatten.length; j++) {
        products.push(flatten[j]);
    }
    
    for (let k = 0; k < data.Includes.length; k++) {
        if (data.Includes[k] !== false) {
            included.push(data.Includes[k]);
        }
    }

    productArr = [products, included.flat(1)].flat(1);


    for (let i = 0; i < productArr.length; i++) {
        let lineitem = productArr[i];

        counts[lineitem] = counts[lineitem] ? counts[lineitem] + 1 : 1;
    }

    for (const[key, value] of Object.entries(counts)) {
        countArr.push(new LineItem(value, key));
    }

    return (
        <div className="thisOrder">
            <button className="btn btn-danger btn-sm" onClick={() => setAppState('Table')}>Back</button>
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