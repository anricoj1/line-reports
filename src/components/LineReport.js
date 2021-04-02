// react
import React, { useState } from 'react';

// line-item
import LineItem from './LineItem';

const LineReport = ({ orders, date, navSelection, setAppState }) => {
    const [selection, setSelection] = useState('All');
    let productArr = [];
    let counts = {}; //init product counts
    let countArr = [];
    let selections = ['All *Soon*', 'Sides *Soon*', 'Main *Soon*', 'Included *Soon*'];

    // set arrays to flatten
    let options = [];
    let included = [];
    let main = [];

    for (let j = 0; j < orders.length; j++) { // options
        if (orders[j].Options.length > 0) {
            for (let k = 0; k < orders[j].Options.length; k++) {
                orders[j].Options[k].forEach(option => {
                    options.push(option.Value);
                })
            }
        }
        
    }

    for (let l = 0; l < orders.length; l++) { //included
        if (orders[l].Included.length > 0) {
            for (let m = 0; m < orders[l].Included.length; m++) {
                if (orders[l].Included[m] !== false) {
                    included.push(orders[l].Included[m]);
                }
            }
        }
    }

    for (let n = 0; n < orders.length; n++) { // main
        if (orders[n].Main.length > 0) {
            for (let p = 0; p < orders[n].Included.length; p++) {
                main.push(orders[n].Main[p]);
            }
        }
    }


    productArr = [options, included.flat(1), main].flat(1); //reset productArray



    for (let i = 0; i < productArr.length; i++) { //gather quanties of products in array
        let lineitem = productArr[i];

        counts[lineitem] = counts[lineitem] ? counts[lineitem] + 1 : 1;
    }


    for (const [key, value] of Object.entries(counts)) { //push Line-Item Obj w/ key & value calls (this.getDept())
        countArr.push(new LineItem(value, key))
    }

    const exportTable = () => {
        let table = document.getElementById('printable');
        let tablestyle = '' +
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

        tablestyle += table.outerHTML;

        let newWin = window.open('');
        newWin.document.write(tablestyle);
        newWin.document.close();
        newWin.print();

    }


    const filterBy = (selection) => {
        switch (selection) {
            case "All":
                return productArr;

            case "Sides":
                return productArr = options;
            
            case "Included":
                return productArr = included.flat(1);

            case "Main":
                return productArr = main;
        }
    }

    return (
        <div className="Report">
            <button className="btn btn-danger btn-sm" onClick={() => exportTable()}>Print</button>
            <button className="btn btn-primary btn-sm" onClick={() => setAppState('Table')}>Back To Table</button>
            <select className="btn btn-success btn-sm text-center" value={selection} onChange={e => { setSelection(e.target.value); filterBy(e.target.value)}}>
                {selections.map(option => (
                    <option key={option}>{option}</option>
                ))}
            </select>
            <div id="printable">
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
        </div>
    )
}

export default LineReport;