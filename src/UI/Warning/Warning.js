import React from 'react';
import PropTypes from 'prop-types';

import classes from './Warning.module.css';

const warning = (props) => (
    <div className={classes.Warning}>
        <p>{props.text}</p>
    </div>
)

warning.propTypes = {
    text: PropTypes.string
}

export default warning;