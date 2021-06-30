// react
import React from 'react';

// material-ui table
import { Table, TableBody, TableCell, TableHead, TableContainer, TableRow } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { DueListBar } from './Taskbar';


// Counter
import { Counter } from '../Exports';

const DueList = ({ props, orders, classes }) => {
    // table headers
    let headers = ['Order #', 'Name', 'Cell', 'Location', 'Status', 'Date & Time Fufillment', 'Date & Time Placed', 'Total', 'Product Count'];

    return props.date === '' ? <div>
        <DueListBar props={props} />
        <Alert severity="warning">Submitting a <b>Due List</b> without a date from <b>{props.state.header}</b> renders too many orders. Please select a date</Alert>
    </div> : (
        <React.Fragment>
            <div>
                <DueListBar props={props} />
            </div>
            <div id="list" className={classes.dueList}>
                {orders.map((order, i) => (
                    <TableContainer key={i} className={classes.tableContainer}>
                        {console.log(order)}
                        <h3 className="text-center">{order.User.Name}</h3>
                        <Table stickyHeader aria-label="sticky-table">
                            <TableHead>
                                <TableRow>
                                    {!order.Attributes ? null : order.Attributes.map((header, i) => (
                                        <TableCell key={i} className={classes.header}>{header.Key}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow hover>
                                    {!order.Attributes ? null : order.Attributes.map((att, i) => (
                                        <TableCell key={i}>{att.Value}</TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Table stickyHeader aria-label="sticky-table">
                            <TableHead>
                                <TableRow>
                                    {headers.map(header => (
                                        <TableCell key={header} className={classes.header}>{header}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow hover>
                                    <TableCell>{order.User.OrderID}</TableCell>
                                    <TableCell>{order.User.Name}</TableCell>
                                    <TableCell>{order.User.PhoneNumber}</TableCell>
                                    <TableCell>{order.User.PickupLocation}</TableCell>
                                    <TableCell>{order.User.Status}</TableCell>
                                    <TableCell>{order.User.StartTimeWindow}</TableCell>
                                    <TableCell>{order.User.TimeStamp}</TableCell>
                                    <TableCell>{order.User.Total}</TableCell>
                                    <TableCell>{order.User.TotalProductCount}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Table stickyHeader aria-label="sticky-table">
                            <TableHead>
                                <TableRow>
                                    {['Quantity', 'Product Name', 'Department'].map(cell => (
                                        <TableCell key={cell} className={classes.header}>{cell}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {new Counter().handleOrderCounts(order).map((item, i) => (
                                    <TableRow key={i} hover>
                                        <TableCell>{item.qty}</TableCell>
                                        <TableCell>{item.item}</TableCell>
                                        <TableCell>{item.dept}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <center className="notes">
                            <h4 className="text-center">Notes</h4>
                            <ul>
                                {order.Notes.map((note, i) => (
                                    note !== null ? <li key={i}>{note}</li> : null
                                ))}
                            </ul>
                        </center>
                    </TableContainer>
                ))}
            </div>
        </React.Fragment>
    )
}

export default DueList;