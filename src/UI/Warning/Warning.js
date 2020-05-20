import React from 'react';

import classes from './Warning.module.css';

const warning = (props) => (
    <div className={classes.Warning}>
        <p>{props.text}</p>
    </div>
)

export default warning;