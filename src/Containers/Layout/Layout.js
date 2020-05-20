import React, { Component } from 'react';

import SideDrawer from '../../Components/SideDrawer/SideDrawer';
import MainScreen from '../MainScreen/MainScreen';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        data: [],
        temp: [],
        category: [],
        matchUp: [],
        url: 'https://api.chucknorris.io/jokes/',
        path: 'random',
        search: false,
        categories: false,
        popup: false,
        like: false,
        warning: false,
        active: false,
        loading: false,
        words: ''
    }

    componentDidMount(){
        this.getFetch()
        this.getCategoriesFetch()
        const temp = localStorage.getItem('favorites') || JSON.stringify([])
        this.setState({temp: JSON.parse(temp)})
    }

    // FETCHING DATA

    getFetch(){
        fetch(this.state.url + this.state.path)
        .then(response => response.json())
        .then(result => {
            const ids = []
            this.state.temp.forEach(item => ids.push(item.id))
            if(ids.indexOf(result.id) === -1){
                this.setState({
                data: [{...result, like: false}],
                like: false,
                loading: false
                })
            }else {
                this.state.temp.map(item => {
                    return this.setState({
                        data: [{...item}],
                        loading: false
                        })
                })
            }
        })
    }

    async getCategoriesFetch(){
        await fetch(this.state.url + 'categories')
        .then(response => response.json())
        .then(response => {
            return this.setState({category: response})})
    }

    getSearchFetch(){
        fetch(this.state.url + this.state.path)
            .then(response => response.json())
            .then(response => {
                const fetchData = this.state.matchUp
                const ids = []
                for(let key in response.result){
                    fetchData.map(item => ids.push(item.id))
                    if(ids.indexOf(response.result[key].id) === -1 && fetchData.length < 10){
                        fetchData.push({
                            ...response.result[key],
                            like: false
                        })
                    }
                }
                this.setState({data: fetchData, like: false, loading: false})
            })
    }

    // FETCHING DATA BUTTON

    getJokeHandler = () => {
        if(this.state.search){
            if(this.state.words.length < 3){
                this.setState({data: []})
                return this.warningToggle()
            }else{
                return this.setState({data: [], loading: true}, this.getSearchFetch())
            }
        } 
        if(this.state.categories && !this.state.active){
            this.warningToggle()
        }
        else this.setState({loading: true}, this.getFetch())
    }

    // CHOOSE CATEGORIES OF JOKE

    onInputChange = (e) => {
        switch(e.target.value){
            case('random'):
                return this.setState({ path: e.target.value, search: false, categories: false, active: false, words: '', data: [], loading: false})
            case('categories'):
                return this.setState({ categories: true, search: false, words: '', data: [], loading: false})
            case('search'):
                return this.setState({ search: true, categories: false, active: false, data: [], loading: false})
            default: 
                return this.state.path
        }
    }

    onInputChangeCategory = (e) => {
        let query = e.target.value;
        return this.setState({ path: `random?category=${query}`, active: true})
    }

    onInputChangeSearch = (e) => {
        const keyword = e.target.value.toLowerCase()
        if (keyword.length >= 3 && this.state.search){
            const arr = this.state.temp.filter(item=>item.value.toLowerCase().includes(keyword))
            this.setState({matchUp: arr, path: `search?query=${keyword}`, popup: true, words: keyword, loading: true}, this.getSearchFetch())
        }
        else {
            this.setState({data: [], popup: false, path: 'random', words: keyword})
        }
    }


    // ADD/DELETE FAVOURITE JOKE


    likeHandler = (id, data) => {
        this.state.data.forEach(item => {
            if(item.id === id){
                if(item.like){
                    data.like = false
                    this.setState({temp: data})
                    const temp = this.state.temp.filter(item => item.id !== id)
                    this.setState({temp: temp, like: !this.state.like})
                    localStorage.setItem('favorites', JSON.stringify(temp))
                }else{
                    this.setState({like: !this.state.like})
                    setTimeout(()=>{
                        this.setState({like: !this.state.like})
                    }, 500)
                    data.like = true
                    this.state.temp.push(data)
                    localStorage.setItem('favorites', JSON.stringify(this.state.temp))
                }
            }
        })
    }

    deleteHandler = (id, data) => {
        data.like = false
        this.setState({temp: data})
        const temp = this.state.temp.filter(item => item.id !== id)
        this.setState({temp: temp})
        localStorage.setItem('favorites', JSON.stringify(temp))
    }

    // SHOW/HIDE SIDEDRAWER


    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    warningToggle = () => {
        this.setState({warning: true})
        setTimeout(() => this.setState({warning: false}), 1000)
    }

    render () {
        return(
            <>
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    delete={this.deleteHandler}
                    closed={this.sideDrawerClosedHandler}
                    clicked={this.sideDrawerToggleHandler}
                    {...this.state} />
                <main>
                    <MainScreen 
                        onInputChangeSearch={this.onInputChangeSearch}
                        onInputChangeCategory={this.onInputChangeCategory}
                        onInputChange={this.onInputChange}
                        getJokeHandler={this.getJokeHandler}
                        clicked={this.sideDrawerToggleHandler} 
                        likeHandler={this.likeHandler} 
                        deleteHandler={this.deleteHandler}
                        {...this.state} />
                </main>
            </>
        )
    }
}

export default Layout;