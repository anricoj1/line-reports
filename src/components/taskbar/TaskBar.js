// react
import React, { useState } from 'react';

// components
import Report from './views/Report';
import DueList from './views/DueList';

// css
import './Taskbar.css';


const TaskBar = ({ navselection, setView, setAppState, appState, orders }) => {
    const [date, setDate] = useState(`${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`);
    let arr = [];
    let orderlist = [];
    let comments = [];

    const convertDate = (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate() + 1}/${new Date().getFullYear()}`;
    }

    orders.map(order => {
        if (appState === date) {
            if (order.StartTimeWindow.substring(0, 9).toString().includes(convertDate(date).toString())) return arr.push(order.OrderID);
        }
    });

    arr.map(async id => {
        const thisreport = await fetch(`https://storeapi.grocerkey.com/order/${id}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'storeCode': 67879,
                'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
            }
        });

        let neworder = await thisreport.json();

        if (neworder.Comments !== null) {
            comments.push({ 
                "ID": neworder.OrderID,
                "User": neworder.User.Name,
                "Comment": neworder.Comments
            });
        }

        return orderlist.push(neworder);
    });

    let includeditems = [
        {
             "07196227537": [
                 {"name": "1 slow-roasted, sliced, Brisket of Beef (5-6 lbs.)", "dept": "Kitchen"}, 
                 {"name": "1 pint of Stew's Red Wine Steak Sauce", "dept": "Kitchen"},
                 {"name": "16 Potato Pancakes", "dept": "Kitchen"}
            ],
        },
        {
            "07196227899": [
                {"name": "1 Oven Ready Filet", "dept": "Kitchen"},
                {"name": "1 Extra Large Shrimp Platter", "dept": "Seafood"},
                {"name": "12 Snowball Rolls", "dept": "Bakery"}
            ],
        },
        {
            "07196227536": [
                {"name": "1 Oven Ready Filet", "dept": "Kitchen"},
                {"name": "1 Extra Large Shrimp Platter", "dept" : "Seafood"},
                {"name": "12 Snowball Rolls", "dept": "Bakery"}
            ],
        },
        {
            "07196221367": [
                {"name": "1 Medium Roasted Turkey", "dept": "Kitchen"},
                {"name": "1 Quart of our own Homestyle Turkey Gravy", "dept": "Kitchen"},
                {"name": "1 Pint of our own chef-prepared Cranberry Orange Sauce", "dept": "Kitchen"},
                {"name": "1 Side of Country Style Stuffing", "dept": "Kitchen"},
                {"name": "12 Freshly Baked Snowball Rolls", "dept": "Bakery"}
            ],
        },
        {
            "07196229667": [
                {"name": "1 Extra Large Shrimp Platter", "dept": "Seafood"},
                {"name": "6 Snowball Rolls", "dept": "Bakery"}
            ]
        },
        {
            "07196229365": [
                {"name": "horseradish sauce and bordelaise sauce", "dept": "Kitchen"},
                {"name": "6 Snowball Rolls", "dept": "Bakery"}
            ],
        },
        {
            "07196229612": [
                {"name": "Country Style Stuffing", "dept": "Kitchen"},
                {"name": "Turkey Gravy", "dept": "Kitchen"},
                {"name": "Cranberry Orange Sauce", "dept": "Kitchen"}
            ],
        },
        {
            "07196229335": [
                {"name": "16 oz. container of Pineapple Ham Glaze","dept": "Kitchen"},
                {"name": "6 Snowball Rolls", "dept": "Bakery"}
            ],
        },
        {
            "07196229367": [
                {"name": "6 Snowball Rolls", "dept": "Bakery"}
            ],
        },
        {
            "07196229681": [
                {"name": "6 Snowball Rolls", "dept": "Bakery"}
            ],
        },
        {
            "7196229336": [
                {"name": "16oz. of Au Jus", "dept": "Kitchen"},
                {"name": "8oz. of mint jelly", "dept": "Kitchen"},
                {"name": "6 Snowball Rolls", "dept": "Bakery"}
            ],
        }
    ]


    return (
        <ul className="links">
            <li className="link">
                <input type="date" value={date} onChange={e => setDate(e.target.value)}></input>
                <button onClick={() => { setAppState(date); setView(<Report orderlist={orderlist} date={date} includeditems={includeditems} comments={comments} />)}}>Line Report for {navselection} (Double Click)</button>
            </li>
            <li className="link">
                <button className="btn btn-success btn-sm" onClick={() => { setAppState('Due-List'); setView(<DueList />)}}>Due List</button>
            </li>
            {appState === 'Line-Report' || appState === date || appState === 'Due-List' ? <li className="link"><button className="btn btn-danger btn-sm" onClick={() => setAppState('Table')}>Back to Table</button></li> : null}
        </ul>
    )
}

export default TaskBar;