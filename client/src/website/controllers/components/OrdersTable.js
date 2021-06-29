// react
import React, { useState } from 'react';

// export functions
import { fetchOrder } from '../Exports';
import { OrderTableBar } from './Taskbar';

// material-ui table
import { Table, TableBody, TableCell, TableHead, TableContainer, TableRow, TablePagination, Paper } from '@material-ui/core';

const OrdersTable = ({ props, classes, data, headers }) => {
    // deconstruct props
    const { setModal } = props;

    // page state
    const [page, setPage] = useState({ number: 0, rowsPer: 25 });

    // change page number
    const changePage = (event, nextPage) => setPage({ number: nextPage, rowsPer: page.rowsPer });

    // how many rows per page
    const changePerPage = (event) => setPage({ number: page.number, rowsPer: +event.target.value });

    return (
        <React.Fragment>
            <OrderTableBar props={props} />
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky-table">
                        <TableHead>
                            <TableRow>
                                {headers.map(header => (
                                    <TableCell className={classes.header} key={header}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page.number * page.rowsPer, page.number * page.rowsPer + page.rowsPer).map((order, i) => (
                                <TableRow key={i} hover role="checkbox" tabIndex={-1} onDoubleClick={() => fetchOrder(order.User.OrderID, setModal)} >
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[25, 50, 75, 100, 150, 200]}
                    component="div"
                    count={data.length}
                    rowsPerPage={page.rowsPer}
                    page={page.number}
                    onChangePage={changePage}
                    onChangeRowsPerPage={changePerPage}
                />
            </Paper>
        </React.Fragment>
    )
}

export default OrdersTable;