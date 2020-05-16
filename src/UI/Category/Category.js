import React from 'react';

import classes from './Category.module.css';

const category = (props) => {
    return (
        <div className={classes.Category}>
            <input type="radio" id={props.name} name="categories" value={props.name} />
            <label htmlFor={props.name}>{props.name}</label>
        </div>
    )
}

export default category;