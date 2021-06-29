// react
import React, { useState, useEffect } from 'react';

// components
import { TopBar, BottomBar } from './navigation/Bars';
import { Loader, SwitchState, ModalRenderer } from './controllers/Exports';

// css
import './Mobile.css';

const Mobile = () => {
    // state
    const [state, setState] = useState({ state: 0, header: 'All Stores' });

    // orders
    const [orders, setOrders] = useState([]);

    // modal
    const [modal, setModal] = useState({ state: false, name: null, data: {} });

    // date
    const [date, setDate] = useState('');

    // states to props
    let props = { state: state, setState: setState, orders: orders, setOrders: setOrders, modal: modal, setModal: setModal, date: date, setDate: setDate };


    useEffect(() => {
        // mounted state & and abort controller 
        let mounted = true;
        let ac = new AbortController();

        let fetchData = async () => { // send request > taks abort controller signal
            let request = await fetch('/api/orders', {
                signal: ac.signal
            });

            // mounted ? setOrders if not abort request 
            mounted ? setOrders(await request.json()) : ac.abort()
        }

        fetchData();

        // cleanup, if web component is unmounted cancel request
        return () => mounted = false;
    }, []);


    return (
        <div className="Mobile">
            <ul className="navigation-top">
                <TopBar props={props} />
            </ul>
            <div id="content">
                {!orders[0] ? <Loader msg={'Loading'} /> : <SwitchState props={props} />}
            </div>
            <ModalRenderer
                setModal={setModal}
                modal={modal}
             />
            <ul className="navigation-bottom">
                <BottomBar props={props} />
            </ul>
        </div>
    );
}

export default Mobile;