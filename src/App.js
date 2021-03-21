// react
import React, { useEffect, useState } from 'react';

// components
import Web from './components/Web';
import Mobile from './components/Mobile';

const App = () => {
    const [windowSize, setWindowSize] = useState({ "wh" : window.innerHeight, "ww" : window.innerWidth });
    const [orders, setOrders] = useState([]);

    useEffect(async () => {
        const response = await fetch('https://storeapi.grocerkey.com/orderview', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'storeCode': 67879,
                'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
            }
        })

        return setOrders(await response.json())
    },[]);

    window.onresize = () => {
        return setWindowSize({ "wh" : window.innerHeight, "ww" : window.innerWidth });
    }

    return windowSize.ww < 1100 || windowSize.wh < 700 ? <Mobile windowSize={windowSize} orders={orders} /> : <Web windowSize={windowSize} orders={orders} />;
}

export default App;