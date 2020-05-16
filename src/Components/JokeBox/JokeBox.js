import React, { useEffect } from 'react';

import classes from './JokeBox.module.css';

const JokeBox = (props) =>{
    const heart = [classes.Heart]
    let obj = props.data.filter(item => item.like)
    if(obj.length){
        heart.push(classes.Liked)
    }
    useEffect(()=>{
        let obj = props.data.filter(item => item.like)
        console.log('JokeBox, props.data.value: ', obj)
    }, [props.data])
    return (<>
    {props.data.map(item => {
            const date = Math.floor((((Date.now() - new Date(item.updated_at).getTime())/1000)/60)/60)
            return (
                <div className={classes.Container} key={item.id}>
                    <div className={heart.join(' ')} onClick={()=>props.getLike(item.id, item)}></div>
                    <div className={classes.Content}>
                        <div className={classes.Icon}></div>
                        <div className={classes.ContainerJoke}>
                            <div className={classes.Link}>ID: <a href={item.url}>{item.id}<div className={classes.LinkIcon}></div></a></div>
                            <div className={classes.Joke}>{item.value}</div>
                            <div className={classes.Update}>
                                <span>Last update: {date} hours ago</span>
                                <button>{item.categories.length ? item.categories : 'random'}</button>
                            </div>
                        </div>
                    </div>
            </div>
            )
            })
        }
    </>
    )
}

export default JokeBox;
