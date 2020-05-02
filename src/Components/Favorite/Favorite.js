import React from 'react';

import classes from '../Favorite/Favorite.module.css';

const favorite = (props) => {
    const id = props.id
    return (
        <div className={classes.Favorite}>
            <div className={classes.Heart} onClick={()=>props.deleteHandler(id)}></div>
            <div className={classes.FavoriteContent}>
                <div className={classes.Icon}></div>
                <div className={classes.FavoriteJoke}>
                    <div className={classes.Link}>ID: <a href={props.url}>{props.id}</a></div>
                    <div className={classes.FJoke}>{props.joke}</div>
                    <div className={classes.Update}>
                    <p>Last update: {props.time} hours ago</p>
                    </div>
                </div>
            </div>
      </div>
        )
}

export default favorite;