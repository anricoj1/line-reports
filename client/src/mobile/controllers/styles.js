// material-ui
import { makeStyles, withStyles } from '@material-ui/core';

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
    sort: {
        backgroundColor: theme.palette.background.paper,
        margin: 'auto',
        width: '80%',
        height: '20%',
        borderRadius: '20px',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    filter: {
        backgroundColor: theme.palette.background.paper,
        margin: 'auto',
        width: '80%',
        height: '30%',
        borderRadius: '20px',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    search: {
        backgroundColor: theme.palette.background.paper,
        margin: 'auto',
        width: '80%',
        height: '11%',
        borderRadius: '20px',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));