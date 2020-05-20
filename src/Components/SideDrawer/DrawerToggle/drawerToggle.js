import React from 'react';
import PropTypes from 'prop-types';

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

drawerToggle.propTypes = {
    clicked: PropTypes.func,
    show: PropTypes.bool,
}

export default drawerToggle