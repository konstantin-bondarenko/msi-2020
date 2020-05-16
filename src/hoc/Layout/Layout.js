import React, { Component } from 'react';

import SideDrawer from '../../Components/SideDrawer/SideDrawer';
import MainScreen from '../../Containers/MainScreen/MainScreen';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        temp: [],
        like: false
    }

    componentDidMount(){
        const temp = localStorage.getItem('favorites') || JSON.stringify([])
        this.setState({temp: JSON.parse(temp)})
    }

    // ADD/DELETE FAVOURITE JOKE


    likeHandler = (id, data) => {
        if(!this.state.like){
            this.setState({like: !this.state.like})
            let items = data
            items.like = true
            this.state.temp.push(items)
            localStorage.setItem('favorites', JSON.stringify(this.state.temp))
        }else{
            this.setState({like: !this.state.like})
            let items = data
            items.like = false
            this.setState({temp: items})
            const temp = this.state.temp.filter(item => item.id !== id)
            this.setState({temp: temp})
            localStorage.setItem('favorites', JSON.stringify(temp))
        }
    }

    deleteHandler = (id) => {
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