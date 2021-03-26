// react
import React from 'react';

// components
import RunReport from './RunReport';
import NullText from './NullText';


// css
import './Views.css';


const Report = ({ orderlist, date, includeditems, comments }) => {
    let arr = [];
    let newarr = [];
    let counts = {};
    let thismap = new Map();
    let newdate = `${date.toString().substring(9)}/${date.toString().substring(5, 7)}/${date.toString().substring(0, 4)}`


    includeditems.map(item => {
        return thismap.set(Object.keys(item)[0], Object.values(item));
    });

    orderlist.map(orders => {
        orders.OrderLines.map(order => {
            if (thismap.has(order.Product.UPC)) {
                arr.push(order.Product.Name)
                order.Options.map(side => arr.push(side.Value));
                thismap.get(order.Product.UPC).map(item => item.forEach(i => arr.push(i.name)));
            } else {
                arr.push(order.Product.Name);
                order.Options.map(side => arr.push(side.Value));
            }
        });
    });

    for (let i = 0; i < arr.length; i++) {
        let lineitem = arr[i];

        counts[lineitem] = counts[lineitem] ? counts[lineitem] + 1 : 1;
    }

    for (const [key, value] of Object.entries(counts)) {
        newarr.push({
            "Qty" : value,
            "Item": key
        })
    }

    return orderlist.length > 0 ? <RunReport linereport={newarr} date={newdate} location={`${orderlist[0].PickupLocation.AddressLine1} ${orderlist[0].PickupLocation.AddressLine2}`} comments={comments} /> : <NullText />
}


export default Report;