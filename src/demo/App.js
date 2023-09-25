/* eslint no-magic-numbers: 0 */
import React, { useState } from 'react';

import { DashDbtReactflow } from '../lib';

const App = () => {

    const [state, setState] = useState({});
    const setProps = (newProps) => {
            setState(newProps);
        };

    return (
        <div>
            <DashDbtReactflow
                setProps={setProps}
                {...state}
            />
        </div>
    )
};


export default App;
