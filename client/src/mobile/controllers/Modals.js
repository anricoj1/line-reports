// react
import React, { useState } from 'react';

// material-ui
import { Radio, RadioGroup, FormControlLabel, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export const Sort = ({ classes }) => {
    const [value, setValue] = useState(null);

    return (
        <div className={classes.sort}>
            <b>Sort</b>
            <RadioGroup name="sort" value={value} onChange={e => setValue(e.target.value)}>
                <FormControlLabel value="Start Time Window" control={<Radio />} label="Start Time Window" />
                <FormControlLabel value="Order Number" control={<Radio />} label="Order Number" />
            </RadioGroup> 
        </div>
    )
}

export const Filter = ({ classes }) => {
    const [value, setValue] = useState(null);

    return (
        <div className={classes.filter}>
            <b>Filter By</b>
            <RadioGroup name="filter" value={value} onChange={e => setValue(e.target.value)}>
                <FormControlLabel value="None" control={<Radio />} label="None" />
                <FormControlLabel value="Today" control={<Radio />} label="Orders For Today" />
                <FormControlLabel value="Tomorrow" control={<Radio />} label="Orders For Tomorrow" />
                <FormControlLabel value="Placed Today" control={<Radio />} label="Orders Placed Today" />
            </RadioGroup> 
        </div>
    )
}

export const Search = ({ classes }) => {
    return (
        <div className={classes.search}>
            <TextField
                fullWidth 
                variant="outlined" 
                label="Order#"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}  
            />
        </div>
    )
}