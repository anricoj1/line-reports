// react
import React, { useEffect, useState } from 'react';

// components
import Navbar from './components/navbar/Navbar';
import Div from './components/Div';

// css
import './App.css';


const App = () => {
    const [orders, setOrders] = useState([]);
    const [navselection, setNavSelection] = useState('All Stores');
    const [appState, setAppState] = useState('Table');
    const [view, setView] = useState(null);

    useEffect(async () => {
        const response = await fetch('https://storeapi.grocerkey.com/orderview?pagesize=100', {
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
        
        return setOrders(await response.json());

    },[]);

    return (
        <div className="App">
            <div className="navbar navbar-expand-lg navbar-dark bg-success">
                <Navbar setNavSelection={e => setNavSelection(e)} />
            </div>
            <div className="switch-component">
                {orders.length < 1 ? null : <Div navselection={navselection} orders={orders.Result} appState={appState} setAppState={e => setAppState(e)} view={view} setView={e => setView(e)} />}
            </div>
        </div>
    )
}

export default App;