// react
import React, { useState } from 'react';

// Counter
import { Counter } from '../Exports';
import { ReportBar } from './Taskbar';

// material-ui table
import { Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


const LineReport = ({ props, orders, classes }) => {
    // filter state
    const [filter, setFilter] = useState('No Filter');

    // call handleCounts to initalize countArr
    let countArr = new Counter().handleCounts(orders);

    // handle filter state 
    filter !== 'No Filter' ? countArr = countArr.filter(e => e.dept !== undefined ? e.dept.includes(filter) : null) : countArr;

    return (
        <React.Fragment>
            <div>
                <ReportBar props={props} filter={filter} setFilter={setFilter} />
                {props.date === '' ? <Alert severity="info">Please <b>note</b> if you see this <b>message</b>, a <b>date</b> is not <b>selected</b>. You should only submit a report when a date is selected. You are viewing the quantity of every product from <b>{props.state.header}</b>.</Alert> : null}
            </div>
            <Paper className={classes.root} id="report">
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky-table">
                        <TableHead>
                            <TableRow>
                                {['Quantity', 'Product Name', 'Department'].map(cell => (
                                    <TableCell key={cell} className={classes.header}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {countArr.map((item, i) => (
                                <TableRow key={i} hover>
                                    <TableCell>{item.qty}</TableCell>
                                    <TableCell>{item.item}</TableCell>
                                    <TableCell>{item.dept}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </React.Fragment>
    );
}

export default LineReport;