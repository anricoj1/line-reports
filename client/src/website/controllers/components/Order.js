// react
import React from 'react';

// material-ui table
import { Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper, Button } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';


// Counter
import { Counter } from '../Exports';


const Order = ({ order, classes }) => {
    let headers = ['Order #', 'Name', 'Location', 'Status', 'Date & Time Fufillment', 'Date & Time Placed', 'Total'];

    return order === null ? null : (
        <React.Fragment>
            <h2 className="text-center">Order Invoice For {order.Details.User.Name}</h2>
            <div className={classes.space}>
                <Button endIcon={<PrintIcon />} color="secondary" variant="contained" onClick={() => new Counter().printThis(document.getElementById('invoice'))}>Print</Button>
            </div>
            <Paper className={classes.root} id="invoice">
                <TableContainer>
                    <Table stickyHeader aria-label="sticky-table" className={classes.space}>
                        <TableHead>
                            <TableRow>
                                {order.Attributes.map((header, i) => (
                                    <TableCell className={classes.header} key={i}>{header.Key}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover>
                                {order.Attributes.map((att, i) => (
                                    <TableCell key={i}>{att.Value}</TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table stickyHeader aria-label="sticky-table" className={classes.space}>
                        <TableHead>
                            <TableRow>
                                {headers.map(header => (
                                    <TableCell className={classes.header} key={header}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover>
                                <TableCell>{order.Details.OrderID}</TableCell>
                                <TableCell>{order.Details.User.Name}</TableCell>
                                <TableCell>{order.Details.PickupLocation.Name}</TableCell>
                                <TableCell>{order.Details.Status}</TableCell>
                                <TableCell>{new Date(order.Details.StartTimeWindow).toLocaleString()}</TableCell>
                                <TableCell>{order.Details.Created}</TableCell>
                                <TableCell>{order.Details.GrandTotal}</TableCell>
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
                    <div className="notes">
                        <h4 className="text-center">Notes</h4>
                        <ul>
                            {order.Notes.map((note, i) => (
                                note !== null ? <li key={i}>{note}</li> : null
                            ))}
                        </ul>
                    </div>
                </TableContainer>
            </Paper>
        </React.Fragment>
    )
}

export default Order;
