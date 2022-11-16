import React, { Component } from 'react';
import CardList from '../components/cardlist'
import SearchBox from '../components/searchbox'
// import {robots} from '../robots'
import Scroll from '../components/scroll'
import './App.css'
import ErrorBoundry from '../components/Errorboundry';


class App extends Component{
    constructor(){
        super()
        this.state ={
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json() )
            .then(users => [this.setState({robots:users})])
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
        
    }
    render(){
        const {robots, searchfield } = this.state
        const filteredRobots = robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        if(!robots.length){
            return <h1>Loading</h1>
        } else{
            return(
                <div className='tc'>
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange= {this.onSearchChange}/>
                    <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                    </Scroll>
                </div>
            )
        }
        
    }
    
}

export default App