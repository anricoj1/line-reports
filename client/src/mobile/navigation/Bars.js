// react
import React, { useState } from 'react';
import clsx from 'clsx';

// styles
import { useStyles } from './styles';

// material-ui
import { Drawer, List, ListItem, IconButton, Divider, AppBar, Toolbar, Typography, useTheme } from '@material-ui/core';

// icons
import SortIcon from '@material-ui/icons/Sort';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemText from '@material-ui/core/ListItemText';

// list items
let navList = ['All Stores', 'Norwalk', 'Danbury', 'Yonkers', 'Farmingdale', 'Newington', 'East Meadow', 'Paramus']

export const TopBar = ({ props }) => {
    // classes
    let classes = useStyles();

    // theme
    let theme = useTheme();

    // state
    const [open, setOpen] = useState(false);


    return (
        <React.Fragment>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{ background: '#003E3C' }}
            >
                <Toolbar>
                    {props.state.state != 0 ? <React.Fragment>
                        <IconButton
                            color="inherit"
                            onClick={() => props.setState({ state: 0, header: props.state.header })}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <div>
                            <Typography variant="body1">{props.state.data.User.OrderID}</Typography>
                            <Typography variant="body2">{props.state.data.User.Name}</Typography>
                        </div>
                    </React.Fragment> : <React.Fragment>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setOpen(true)}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {props.state.header}
                        </Typography>
                    </React.Fragment>}
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon color="secondary" /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {navList.map((text, index) => (
                        <ListItem button key={index} onClick={() => props.setState({ state: 0, header: text })}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </React.Fragment>
    )
}

export const BottomBar = ({ props }) => {
    return (
        <React.Fragment>
            <li onClick={() => props.setModal({ state: true, name: "Sort", data: {} })}>
                <SortIcon
                    fontSize="large"
                />
            </li>
            <li onClick={() => props.setModal({ state: true, name: "Filter", data: {} })}>
                <FilterListIcon
                    fontSize="large"
                />
            </li>
            <li onClick={() => props.setModal({ state: true, name: "Search", data: {} })}>
                <SearchIcon
                    fontSize="large"
                />
            </li>
        </React.Fragment>
    )
}