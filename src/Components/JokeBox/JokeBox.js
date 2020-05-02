import React from 'react';

import classes from './JokeBox.module.css';

const jokeBox = (props) =>{
    const heart = [classes.Heart]
    if(props.like){
        heart.push(classes.Liked)
    }
    return (
        <div className={classes.Container}>
            <div className={heart.join(' ')} onClick={props.getLike}></div>
            <div className={classes.Content}>
                <div className={classes.Icon}></div>
                <div className={classes.ContainerJoke}>
                    <div className={classes.Link}>ID: <a href={props.url}>{props.id}</a></div>
                    <div className={classes.Joke}>{props.joke}</div>
                    <div className={classes.Update}>
                    <p>Last update: {props.time} hours ago</p>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default jokeBox;
