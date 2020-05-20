import React from 'react';
import PropTypes from 'prop-types';

import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Favorite from '../Favorite/Favorite';
import DrawerToggle from './DrawerToggle/drawerToggle';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed]
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Toggle}>
                    <DrawerToggle clicked={props.clicked} show={props.open} />
                    <span>Favourite</span>
                </div>
                <Favorite temp={props.temp} delete={props.delete} />
            </div>
        </>
    )
}

sideDrawer.propTypes = {
    open: PropTypes.bool,
    closed: PropTypes.func,
    clicked: PropTypes.func,
    delete: PropTypes.func,
    temp: PropTypes.array
}

export default sideDrawer;