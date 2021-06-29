// material-ui
import { makeStyles, withStyles } from '@material-ui/core';

// tableStyles
export const tableStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 500
    },
    tableContainer: {
        marginBottom: '100px',
        border: '1px solid black',
    },
    dueList: {
        margin: '40px auto',
        width: '80%',
        overflowY: 'scroll',
        height: '80%'
    },
    header: {
        background: '#003E3C',
        color: 'white'
    }
});

export const taskbarStyles = makeStyles({
    submit: {
        width: '10px',
        padding: '15px'
    }
});

export const modalStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black'
    },
    container: {
        backgroundColor: theme.palette.background.paper,
        margin: 'auto',
        width: '60%',
        height: '700px',
        borderRadius: '20px',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflowY: 'scroll'
    },
    header: {
        background: '#003E3C',
        color: 'white'
    },
    space: {
        marginBottom: '20px'
    }
}));