// react
import React, { useEffect, useState } from 'react';

// views
import Website from './website/Website';
import Mobile from './mobile/Mobile';

// css
import './App.css';


const App = () => {
    // window width
    const [ww, setWindow] = useState(window.innerWidth);

    // view
    const [view, setView] = useState(null);

    // on resize
    window.onresize = () => setWindow(window.innerWidth);

    // useEffect when ww changes
    useEffect(() => {
        0 < ww && ww < 900 ? setView(<Mobile />) : setView(<Website />)
    },[ww]);

    return (
        <div className="App">
            {view}
        </div>
    )
}

export default App;