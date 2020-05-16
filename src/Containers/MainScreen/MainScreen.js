import React, { Component } from 'react';

import JokeBox from '../../Components/JokeBox/JokeBox';
import Favorite from '../../Components/Favorite/Favorite';
import DrawerToggle from '../../Components/SideDrawer/DrawerToggle/drawerToggle';
import Category from '../../UI/Category/Category';
import classes from './MainScreen.module.css';


class MainScreen extends Component {
    state = {
        data: [],
        temp: [],
        category: [],
        like: false,
        url: 'https://api.chucknorris.io/jokes/',
        path: 'random',
        search: false,
        categories: false,
        popup: false,
        showSideDrawer: false
    }

    // FETCHING DATA

    componentDidMount(){
        this.getFetch()
        this.getCategoriesFetch()
        const temp = localStorage.getItem('favorites') || JSON.stringify([])
        this.setState({temp: JSON.parse(temp)})
    }

    getFetch(){
        fetch(this.state.url + this.state.path)
        .then(response => response.json())
        .then(result => {
            console.log('Fetchdata: ',result)
            this.setState({
            data: [{...result, like: false}]
            }, ()=>console.log('data after like',this.state.data))
        })
    }

    getCategoriesFetch(){
        fetch(this.state.url + 'categories')
        .then(response => response.json())
        .then(response => {
            return this.setState({category: response})})
    }

    // FETCHING DATA BUTTON

    getJokeHandler = () => {
        if(this.state.search) this.setState({like: false, popup: false, search: false, data: [], path: 'random'}, ()=>{
            fetch(this.state.url + 'random').then(res=>res.json()).then(res=>this.setState({data: [{...res}]}))
        })
        else this.setState({like: false}, this.getFetch())
    }

    // CHOOSE CATEGORIES OF JOKE

    onInputChange = (e) => {
        switch(e.target.value){
            case('random'):
                return this.setState({ path: e.target.value, search: false, categories: false})
            case('categories'):
                return this.setState({ categories: true, search: false})
            case('search'):
                return this.setState({ search: true, categories: false})
            default: 
                return this.state.path
        }
    }

    onInputChangeCategory = (e) => {
        let query = e.target.value;
        return this.setState({ path: `random?category=${query}`}, ()=>{
            fetch(this.state.url + `random?category=${query}`).then(res=>res.json()).then(res=>this.setState({data: [{...res}]}))
            })
    }

    // SEARCHING JOKE BY VALUE

    getSearchFetch(){
        fetch(this.state.url + this.state.path)
            .then(response => response.json())
            .then(response => {
                const fetchData = this.state.data
                for(let key in response.result){
                    fetchData.push({
                        ...response.result[key],
                    })
                }
                this.setState({data: fetchData})
            })
    }
    onSearchInputChange(e) {
        const keyword = e.target.value
        if (keyword.length > 3){
            let arr = this.state.temp.filter(item=>item.value.includes(keyword))
            this.setState({data: arr, path: `search?query=${keyword.toLowerCase()}`, popup: true}, this.getSearchFetch())
        }
        else this.setState({data: []})
    }

    render(){
        let renderElement = <JokeBox {...this.state} like={this.props.like} getLike={this.props.likeHandler} />
        if(this.state.popup) renderElement = this.state.data ? this.state.data.slice(0,5).map(item => <JokeBox data = {[item]} like={this.props.like} getLike={this.props.likeHandler} key={item.id} />) : <p>Loading...</p>
        let search = ''
        let categories = ''
        if(this.state.search){
            search = 
            <div>
                <input 
                    className={classes.SearchInput} 
                    type='text' placeholder='Free text search...'
                    onChange={(e)=>this.onSearchInputChange(e)} />
            </div>
        }
        if(this.state.categories){
            categories = 
            <div className={classes.Btns} onChange={(e)=>this.onInputChangeCategory(e)}>
                {this.state.category.map((item, index)=>{
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
                    <div className={classes.Inputs} onChange={(e) => this.onInputChange(e)}>
                        <div>
                            <input type='radio' name='site' value='random' id='random' defaultChecked/>
                            <label className={classes.InputsLabel} htmlFor='random'>Random</label>
                        </div>
                        <div>
                            <input type='radio' name='site' value='categories' id='categories'/>
                            <label className={classes.InputsLabel} htmlFor='categories'>From categories</label>
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
                        <button className={classes.Btn} onClick={this.getJokeHandler}>Get Chuck Joke</button>
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