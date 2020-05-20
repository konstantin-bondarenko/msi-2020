import React, { Component } from 'react';

import JokeBox from '../../Components/JokeBox/JokeBox';
import Favorite from '../../Components/Favorite/Favorite';
import DrawerToggle from '../../Components/SideDrawer/DrawerToggle/drawerToggle';
import Category from '../../UI/Category/Category';
import Warning from '../../UI/Warning/Warning';
import classes from './MainScreen.module.css';


class MainScreen extends Component {
    render(){
        let renderElement = <JokeBox data={this.props.data} like={this.props.like} getLike={this.props.likeHandler} />
        if(this.props.popup){
            renderElement = this.props.data ? 
            this.props.data.map(item => <JokeBox data = {[item]} like={this.props.like} getLike={this.props.likeHandler} key={item.id} />) 
            : <p>Loading...</p>
        }
        let search = ''
        let categories = ''
        if(this.props.search){
            search = 
            <div>
                {this.props.warning ? <Warning text={'Enter at least 3 letters!'} /> : ''}
                <input 
                    className={classes.SearchInput} 
                    type='text' placeholder='Free text search...'
                    onChange={(e)=>this.props.onInputChangeSearch(e)} />
            </div>
        }
        if(this.props.categories){
            categories = 
            <div className={classes.Btns} onChange={(e)=>this.props.onInputChangeCategory(e)}>
                {this.props.category.map((item, index)=>{
                    return <Category name={item} key={index} />
                })}
            </div>
        }
        return(
            <div className={classes.Main}>
                <div className={classes.Screen}>
                    <div className={classes.Header}>
                        <h3>MSI 2020</h3>
                        <div className={classes.ToggleFavourite}>
                            <DrawerToggle clicked={this.props.clicked} />
                            <span>Favourite</span>
                        </div>
                    </div>
                    <h1>Hey!</h1>
                    <p style={{fontWeight: 'bold'}}>Let's try to find a joke for you:</p>
                    <div className={classes.Inputs} onChange={(e) => this.props.onInputChange(e)}>
                        <div>
                            <input type='radio' name='site' value='random' id='random' defaultChecked/>
                            <label className={classes.InputsLabel} htmlFor='random'>Random</label>
                        </div>
                        <div>
                            <input type='radio' name='site' value='categories' id='categories'/>
                            <label className={classes.InputsLabel} htmlFor='categories'>From categories</label>
                            {this.props.categories && this.props.warning ? <Warning text={'Choose one of these categories'} /> : ''}
                            {categories}
                        </div>
                        <div className={classes.Search}>
                            <div>
                                <input type='radio' name='site' value='search' id='search' />
                                <label className={classes.InputsLabel} htmlFor='search'>Search</label>
                            </div>
                            {search}
                        </div>
                    </div>
                    <div className={classes.Buttons}>
                        <button className={classes.Btn} onClick={this.props.getJokeHandler}>Get Chuck Joke</button>
                    </div>
                    {renderElement}
                </div>
                <div className={classes.Favorite}>
                    <p>Favourite</p>
                        <Favorite {...this.props} delete={this.props.deleteHandler} />
                </div>
            </div>
        )
    }
}

export default MainScreen;