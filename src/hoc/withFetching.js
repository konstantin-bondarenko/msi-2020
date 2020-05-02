import React from 'react';

const withFetching = (url) => (Component) => 
    class WithFetching extends Component {
        state = {
            data: [],
            like: false,
            deleted: false,
            favorites: []
        }

        componentDidMount() {
            this.getFetch()
        }

        getJokeHandler = () => {
            this.getFetch()
            this.setState({like: false})
        }
        deleteHandler = (id) => {
            this.state.favorites.map(item=>{
                if(item.id === id){
                    this.setState({deleted: !this.state.deleted})
                    return this.state.favorites.splice(this.state.favorites.indexOf(item),1)
                }})
        }
        getLikeHandler = () => {
            this.setState({like: !this.state.like})
            if(!this.state.like){
                this.state.favorites.push(...this.state.data)
            }else{
                this.state.favorites.pop() 
            }
        }
        getFetch(){
            fetch(url)
            .then(response => response.json())
            .then(result => {
                this.setState({
                data: [{...result}]
                
                })
            }
            )
        }
        render() {
            return <Component 
                {...this.props}
                {...this.state} 
                getJoke={this.getJokeHandler} 
                getLike={this.getLikeHandler} 
                deleteHandler={this.deleteHandler} />
        }
    }

export default withFetching;