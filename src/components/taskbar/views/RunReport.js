// react
import React from 'react';


const RunReport = ({ linereport, date, location, comments }) => {

    const getDept = (item) => {
        if (item.includes('Pie')) return 'Bakery';
        if (item.includes('Rolls')) return 'Bakery';
        if (item.includes('Cheesecake')) return 'Bakery';
        if (item.includes('Cannoli')) return 'Bakery';
        if (item.includes('Mini Cannoli Platter')) return 'Bakery';
        if (item.includes('Brownie')) return 'Bakery';
        if (item.includes('Cookie')) return 'Bakery';
        if (item.includes('American PU PU')) return 'Sushi';
        if (item.includes('Fresh Mozzarella')) return 'Deli';
        if (item.includes('3 Foot Grinder')) return 'Deli';
        if (item.includes('Wrap Platter')) return 'Deli';
        if (item.includes('sauce')) return 'Kitchen';
        if (item.includes('Broccoli Rabe')) return 'Kitchen';
        if (item.includes('Boneless')) return 'Kitchen';
        if (item.includes('Beef')) return 'Kitchen';
        if (item.includes('Filet Mignon')) return 'Kitchen';
        if (item.includes('Penne')) return 'Kitchen';
        if (item.includes('Brussels')) return 'Kitchen';
        if (item.includes('Sweet Potato Mousse')) return 'Kitchen';
        if (item.includes('Potatoes')) return 'Kitchen';
        if (item.includes('Potato')) return 'Kitchen';
        if (item.includes('Ham Glaze')) return 'Kitchen'
        if (item.includes('Dinner')) return 'Kitchen';
        if (item.includes('Lamb')) return 'Kitchen';
        if (item.includes('Oven')) return 'Kitchen';
        if (item.includes('Ham')) return 'Kitchen';
        if (item.includes('Butternut Squash')) return 'Kitchen';
        if (item.includes('Roasted Sliced Turkey Breast')) return 'Kitchen';
        if (item.includes('Stuffing')) return 'Kitchen';
        if ((item.includes('Rugalach')) || item.includes('Rugelach')) return 'Kitchen';
        if (item.includes('Roasted Asparagus')) return 'Kitchen';
        if ((item.includes('Sauce')) || item.includes('Gravy')) return 'Kitchen';
        if (item.includes('Macaroni')) return 'Kitchen';
        if (item.includes('Green Bean')) return 'Kitchen';
        if (item.includes('Organic Roasted Tri-Colored Carrots')) return 'Kitchen';
        if (item.includes('Organic Tri Colored Baby Carrots')) return 'Kitchen';
        if (item.includes('Meatball')) return 'Kitchen';
        if (item.includes('Salad')) return 'Salbar'
        if (item.includes('Fruit')) return 'Salbar';
        if (item.includes('Shrimp')) return 'Seafood';
        if (item.includes('Lobster')) return 'Seafood';
    }

    const exportTable = () => {
        let table = document.getElementById("content");
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
            <hr />
            <div className="summary">
            <h1>Order Requirements</h1>
                <h2><small>{location}</small></h2>
                <h3>Report for {date}</h3>
                <h4>If you see (Size (ex: Extra Large) / Cook Type (ex: Medium Rare) Refer To The <b>PREVIOUS PRODUCT</b> In The List. There Currently Isn't A Way For Me To Attatch It To That Specific Item. (Will Update In Future!)</h4>
            </div>
            {comments.length !== 0 ?
            <div className="summary">
                <h2>Comments</h2>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}><b>Order #</b> {comment.ID} <b>Customer:</b> {comment.User} <b>Comment:</b> {comment.Comment}</li>
                    ))}
                </ul>
            </div>: null}
            <table className="table">
                <thead>
                    <tr>
                        <th>Qty</th>
                        <th>Item</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {linereport.map((item, i) => (
                        <tr key={i}>
                            <td><b>{item.Qty}</b></td>
                            <td><b>{item.Item}</b></td>
                            <td><b>{getDept(item.Item)}</b></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RunReport;