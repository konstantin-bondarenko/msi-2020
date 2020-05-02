import React from 'react';

import classes from './SideDrawer.module.css';
import Aux from '../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Favorite from '../Favorite/Favorite';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed]
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <Favorite />
            </div>
        </Aux>
    )
}

export default sideDrawer;