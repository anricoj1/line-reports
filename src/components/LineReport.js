// react
import React from 'react';

// line-item
import LineItem from './LineItem';

const LineReport = ({ orders, date, navSelection }) => {
    let productArr = [];
    let counts = {}; //init product counts
    let countArr = [];

    orders.map(order => {
        if (order.Included !== false) { //iter orders (if included is not false or not)
            productArr.push(order.Main);
            order.Options.map(option => productArr.push(option));
            order.Included.map(included => productArr.push(included));
        } else {
            productArr.push(order.Main);
            order.Options.map(option => productArr.push(option));
        }
    });

    for (let i = 0; i < productArr.length; i++) { //gather quanties of products in array
        let lineitem = productArr[i];

        counts[lineitem] = counts[lineitem] ? counts[lineitem] + 1 : 1;
    }

    for (const [key, value] of Object.entries(counts)) { //push Line-Item Obj w/ key & value calls (this.getDept())
        countArr.push(new LineItem(value, key))
    }

    const exportTable = () => { // print our table
        let table = document.getElementById("content")
        let tablestyle = '' +
        '<style type="text/css">' +
        'h1 { font-size: 15px; }' +
        'h2 { font-size: 15px; }' +
        'h3 { font-size: 10px; }' +
        'h4 { font-size: 10px; }' +
        'ul { font-size: 10px;}' +
        'li { font-size: 10px ;}' +
        'table th, table td {' +
        'border: 1px solid black;' +
        'font-size: 10px' +
        '}' +
        '</style>';

        tablestyle += table.outerHTML;

        let newWin = window.open("");
        newWin.document.write(tablestyle);
        newWin.print();
        newWin.close();
    }

    return (
        <div className="Report" id="content">
            <button className="btn btn-danger btn-sm" onClick={() => exportTable()}>Print</button>
            <h2>Line Report For {date} In {navSelection}</h2>
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

export default LineReport;