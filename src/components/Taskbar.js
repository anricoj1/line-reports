// react
import React from 'react';

// components
import OrderTable from './OrderTable';
import LineReport from './LineReport';
import DueList from './DueList';

// css
import '../App.css';


const Taskbar = ({ setComponent, setDate, date, defaultHeaders, filterByDate, navSelection, setAppState }) => {

    return (
        <div className="taskbar">
            <h3><small>Canceled Orders Are Omitted</small></h3>
            <ul className="links">
                <li className="link">
                    <input type="date" value={date} onChange={e => { setDate(e.target.value);  }} id="date-picker"></input>
                    <button onClick={() => { setAppState(''); setComponent(<OrderTable headers={defaultHeaders} data={filterByDate(date)} store={navSelection} setAppState={e => setAppState(e)} setComponent={e => setComponent(e)} />); }}>Submit</button>
                </li>
            </ul>
            <button className="btn btn-primary btn-sm" onClick={() => setDate('')}>Clear Date</button>
            <button className="btn btn-danger btn-sm" onClick={() => { setAppState('Line-Report'); setComponent(<LineReport orders={filterByDate(date)} date={date} navSelection={navSelection} setAppState={e => setAppState(e)} />)}}>Line Report</button>
            <button className="btn btn-success btn-sm" onClick={() => { setAppState('Line-Report'); setComponent(<DueList orders={filterByDate(date)} date={date} navSelection={navSelection} setAppState={e => setAppState(e)} defaultHeaders={defaultHeaders} setComponent={e => setComponent(e)} />)}}>Due List</button>
        </div>
    )
}

export default Taskbar;