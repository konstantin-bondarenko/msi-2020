import React, { Component } from 'react';

import JokeBox from '../../Components/JokeBox/JokeBox';
import Favorite from '../../Components/Favorite/Favorite';
import withFetching from '../../hoc/withFetching';
import classes from './MainScreen.module.css';

const URL = 'https://api.chucknorris.io/jokes/random';

class MainScreen extends Component {
    render(){
        return(
            <div className={classes.Main}>
                <div className={classes.Screen}>
                    <h1>Hey!</h1>
                    <h3>Let's try to find a joke for you:</h3>
                    <div className={classes.Buttons}>
                        <button className={classes.Btn} onClick={this.props.getJoke}>Get Chuck Joke</button>
                    </div>
                    {this.props.data.map(item => {
                        const date = Math.floor((((Date.now() - new Date(item.updated_at).getTime())/1000)/60)/60)
                        const {id, url, value} = item;
                        return (
                        <JokeBox 
                            key={id}
                            getLike={this.props.getLike}
                            like={this.props.like}
                            id={id}
                            url={url}
                            joke={value}
                            time={date} />
                            )
                        })
                    }
                </div>
                <div className={classes.Favorite}>
                    <h1>Favourite</h1>
                    {this.props.favorites.map(item => {
                        const date = Math.floor((((Date.now() - new Date(item.updated_at).getTime())/1000)/60)/60)
                        const {id, url, value} = item;
                        return (
                        <Favorite 
                            key={id}
                            deleted={this.props.deleted}
                            id={id}
                            url={url}
                            joke={value}
                            time={date}
                            deleteHandler={this.props.deleteHandler} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withFetching(URL)(MainScreen);