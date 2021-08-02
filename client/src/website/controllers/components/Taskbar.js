// react
import React, { useState } from 'react';

// export functions
import { fetchOrderId, Counter } from '../Exports';

// material-ui
import { TextField, FormControl, Button, ButtonGroup, Select, MenuItem } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PrintIcon from '@material-ui/icons/Print';


export const OrderTableBar = ({ props }) => {
    // search for order
    const [orderId, setOrderId] = useState({ value: '', error: false });

    // deconstruct props
    const { state, setState, setDate, date, setModal } = props;

    // onEnter handler
    const onEnter = e => e.keyCode === 13 ? fetchOrderId(orderId, setModal, setOrderId) : null;

    return (
        <ul className="taskbar">
            <li>
                <FormControl fullWidth>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            value={orderId.value}
                            type="number"
                            variant="outlined"
                            label="Search by ID"
                            onChange={e => parseInt(e.target.value) < 0 ? setOrderId({ value: '', error: true }) : setOrderId({ value: e.target.value, error: false })}
                            onKeyDown={onEnter}
                            error={orderId.error}
                        />
                        {orderId.error ? <Alert severity="error">Invalid Order Id</Alert> : null}
                    </div>
                </FormControl>
            </li>
            <li>
                <FormControl>
                    <div>
                        <TextField
                            value={date}
                            variant="outlined"
                            type="date"
                            onChange={e => setDate(e.target.value)}
                        />
                        <Button color="secondary" variant="outlined" style={{ padding: '15px' }} onClick={() => setDate('')}>Clear</Button>
                    </div>
                </FormControl>
            </li>
            <li>
                <ButtonGroup>
                    <Button color="primary" onClick={() => setState({ state: 1, header: state.header })}>Report</Button>
                    <Button color="secondary" onClick={() => setState({ state: 2, header: state.header })}>Due List</Button>
                </ButtonGroup>
            </li>
        </ul>
    )
}

export const ReportBar = ({ props, filter, setFilter }) => {
    // deconstruct props
    const { state, setState, setDate, date } = props;

    // filter types
    let filterTypes = ['No Filter', 'Bakery', 'Kitchen', 'Deli', 'Produce', 'Seafood', 'Sushi', 'BBQ', 'Pizza'];

    return (
        <ul className="taskbar">
            <li>
                <Select variant="outlined" value={filter} onChange={e => setFilter(e.target.value)}>
                    {filterTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                </Select>
            </li>
            <li>
                <FormControl>
                    <div>
                        <TextField
                            value={date}
                            variant="outlined"
                            type="date"
                            onChange={e => setDate(e.target.value)}
                        />
                        <Button color="secondary" variant="outlined" style={{ padding: '15px' }} onClick={() => setDate('')}>Clear</Button>
                    </div>
                </FormControl>
            </li>
            <li>
                <ButtonGroup>
                    <Button endIcon={<PrintIcon />} color="secondary" variant="contained" onClick={() => new Counter().printThis(document.getElementById('report'))}>Print</Button>
                    <Button color="primary" variant="contained" onClick={() => setState({ state: 2, header: state.header })}>Due List</Button>
                </ButtonGroup>
            </li>
        </ul>
    )
}

export const DueListBar = ({ props }) => {
    // search for order
    const [orderId, setOrderId] = useState({ value: '', error: false });

    // deconstruct props
    const { state, setState, setDate, date, setModal } = props;

    // onEnter handler
    const onEnter = e => e.keyCode === 13 ? fetchOrderId(orderId, setModal, setOrderId) : null;

    return (
        <ul className="taskbar">
            <li>
                <FormControl fullWidth>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            value={orderId.value}
                            type="number"
                            variant="outlined"
                            label="Search by ID"
                            onChange={e => parseInt(e.target.value) < 0 ? setOrderId({ value: '', error: true }) : setOrderId({ value: e.target.value, error: false })}
                            onKeyDown={onEnter}
                            error={orderId.error}
                        />
                        {orderId.error ? <Alert severity="error">Invalid Order Id</Alert> : null}
                    </div>
                </FormControl>
            </li>
            <li>
                <FormControl>
                    <div>
                        <TextField
                            value={date}
                            variant="outlined"
                            type="date"
                            onChange={e => setDate(e.target.value)}
                        />
                        <Button color="secondary" variant="outlined" style={{ padding: '15px' }} onClick={() => setDate('')}>Clear</Button>
                    </div>
                </FormControl>
            </li>
            <li>
                <ButtonGroup>
                    <Button endIcon={<PrintIcon />} color="secondary" variant="contained" onClick={() => new Counter().printThis(document.getElementById('list'))}>Print</Button>
                    <Button color="primary" variant="contained" onClick={() => setState({ state: 1, header: state.header })}>Report</Button>
                </ButtonGroup>
            </li>
        </ul>
    )
}