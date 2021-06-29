// react
import React, { useEffect, useState } from 'react';

// controllers
import { SwitchState, Loader, ModalRenderer } from './controllers/Exports';

// data
import { filterStore, filterByDate } from './controllers/Exports';

// css
import './Website.css';

// gk image
import gk from './images/gk.svg';

let navList = ['All Stores', 'Norwalk', 'Danbury', 'Yonkers', 'Farmingdale', 'Newington', 'East Meadow', 'Paramus']

const Website = () => {
    // state
    const [state, setState] = useState({ state: 0,  header: "All Stores" });

    // orders
    const [orders, setOrders] = useState([]);

    // modal
    const [modal, setModal] = useState({ state: false, name: null, data: {} });

    // date
    const [date, setDate] = useState('');

    // props
    let props = { state: state, setState: setState, orders: orders, modal: modal, setModal: setModal, date: date, setDate: setDate };

    useEffect(() => {
        // mounted state & and abort controller 
        let mounted = true;
        let ac = new AbortController();

        let fetchData = async () => { // send request > takes abort controller signal
            let request = await fetch('/api/orders', { 
                signal: ac.signal 
            });

            // mounted ? setOrders if not abort request 
            mounted ? setOrders(await request.json()) : ac.abort()
        }

        fetchData();

        // cleanup, if web component is unmounted cancel request
        return () => mounted = false;
    },[]);

    return (
        <div className="wrapper">
            <nav className="sidebar">
                <div className="sidebar-header">
                    <div className="brand"></div>
                </div>

                <ul className="list-unstyled components">
                    {navList.map(link => (
                        <li key={link}>
                            <a onClick={() => setState({state: 0, header: link})}>{link}</a>
                        </li>
                    ))}
                </ul>

                <div className="footer">
                    <p>Powered by <img src={gk} /></p>
                </div>
            </nav>
            <div className="content">
                <nav className="sidenav sidenav-expand-lg sidebar-light bg-light">
                    <div className="container-fluid">
                        <button type="button" id="barCollapse" className="sidenav-btn" onClick={() => document.querySelector('.sidebar').classList.toggle('active')}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>

                        <h4 className="text-center">{state.header} {state.header != 'All Stores' ? `w/ ${filterByDate(date, filterStore(state.header, orders)).length} Orders` : null}</h4>
                    </div>
                </nav>
                {!orders[0] ? <Loader msg={'Loading'} /> : <SwitchState props={props} />}
            </div>
            <ModalRenderer
                setModal={setModal}
                modal={modal}
            />
        </div>
    );
}

export default Website;
