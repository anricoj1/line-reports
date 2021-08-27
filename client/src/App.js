// react
import React, { useEffect, useState } from 'react';

// material-ui
import { useMediaQuery, useTheme } from '@material-ui/core';

// views
import Website from './website/Website';
import Mobile from './mobile/Mobile';

// css
import './App.css';


const App = () => {
    // state
    const [view, setView] = useState(null);

    // theme & media useMediaQuery
    let theme = useTheme();
    let media = useMediaQuery(theme.breakpoints.down(900));


    useEffect(() => {
        !media ? setView(<Website />) : setView(<Mobile />)
    },[media]);

    return (
        <div className="App">
            {view}
        </div>
    )
}

export default App;