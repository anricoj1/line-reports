// react
import React, { useState } from 'react';

// line-item
import LineItem from './LineItem';

const LineReport = ({ orders, date, navSelection, setAppState }) => {
    const [selection, setSelection] = useState('No Filter');
    let productArr = [];
    let counts = {}; //init product counts
    let countArr = [];
    let selections = ['No Filter', 'Bakery', 'Kitchen', 'Deli', 'Produce','Seafood', 'Sushi', 'BBQ'];

    // set arrays to flatten
    let included = [];
    let products = [];


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

    const HandleFilter = () => {
        for (let i = 0; i < orders.length; i++) {

            let flat_prod = orders[i].Products.flat(1);
            let flatten = flat_prod.flat(1);
    
            for (let j = 0; j < flatten.length; j++) {
                flatten[j] !== null ? products.push(flatten[j]) : null;
            }
    
            for (let k = 0; k < orders[i].Includes.length; k++) {
                if (orders[i].Includes[k] !== false) {
                    included.push(orders[i].Includes[k]);
                }
            }
        }
        
        
        productArr = [products, included.flat(1)].flat(1)
        
        
        for (let i = 0; i < productArr.length; i++) { //gather quanties of products in array
            let lineitem = productArr[i];
            
            counts[lineitem] = counts[lineitem] ? counts[lineitem] + 1 : 1;
        }
        
        
        for (const [key, value] of Object.entries(counts)) { //push Line-Item Obj w/ key & value calls (this.getDept())
            countArr.push(new LineItem(value, key))
        }

        selection !== 'No Filter' ? countArr = countArr.filter(e => e.dept !== undefined ? e.dept.includes(selection) : null) : countArr;
        

        return (
            <div id="printable">
                <h2>Line Report For {date} In {navSelection}</h2>
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
            </div>
        )
    }


    return (
        <div className="Report">
            <button className="btn btn-danger btn-sm" onClick={() => exportTable()}>Print</button>
            <button className="btn btn-primary btn-sm" onClick={() => setAppState('Table')}>Back To Table</button>
            <select className="btn btn-success btn-sm text-center" value={selection} onChange={e => setSelection(e.target.value)}>
                {selections.map(option => (
                    <option key={option}>{option}</option>
                ))}
            </select>
            <HandleFilter />
        </div>
    )
}

export default LineReport;