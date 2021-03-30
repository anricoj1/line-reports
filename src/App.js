// react
import React, { useEffect, useState } from 'react';

// components
import NullComponent from './components/NullComponent';
import DivComponent from './components/DivComponent';


const App = () => {
    const [orders, setOrders] = useState([]); //array of orders state

    useEffect(async () => {
        const response = await fetch('/proxy/orders'); //fetch from proxy
        
        return setOrders(await response.json());
    },[])


    //loading? wait on render else render div
    return !orders[0] ? <NullComponent /> : <DivComponent orders={orders} defaultHeaders={['Order #', 'Name', 'Cell', 'Location', 'Status', 'Date & Time Fufillment', 'Date & Time Placed', 'Total', 'Product Count']} />;
}

export default App;