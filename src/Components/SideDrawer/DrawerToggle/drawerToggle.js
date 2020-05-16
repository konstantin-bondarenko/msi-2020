import React from 'react';

import classes from './drawerToggle.module.css';

const drawerToggle = (props) => {

    return (<div
        className={classes.DrawerToggle} 
        onClick={props.clicked}>
            {props.show ? 
            <>
            <div className={classes.Left}></div>
            <div className={classes.Right}></div>
            </>
             : 
            <>
            <div></div>
            <div></div>
            </>}
    </div>)
}

export default drawerToggle