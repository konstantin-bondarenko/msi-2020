import React from 'react';

import classes from '../Favorite/Favorite.module.css';

const Favorite = props => {
    return (<>
        {props.temp.map(item=>{
            const date = Math.floor((((Date.now() - new Date(item.updated_at).getTime())/1000)/60)/60)
            return (
                <div className={classes.Favorite} key={item.id}>
                    <div className={classes.Heart} onClick={()=>props.delete(item.id)}></div>
                    <div className={classes.FavoriteContent}>
                        <div className={classes.Icon}></div>
                        <div className={classes.FavoriteJoke}>
                            <div className={classes.Link}>ID: <a href={item.url}>{item.id}<div className={classes.LinkIcon}></div></a></div>
                            <div className={classes.FJoke}>{item.value}</div>
                            <div className={classes.Update}>
                            <span>Last update: {date} hours ago</span>
                            </div>
                        </div>
                    </div>
              </div>
            )
        })}
        </>
        )
}

export default Favorite;