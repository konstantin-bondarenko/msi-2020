import React, { Component } from 'react';

import MainScreen from './Containers/MainScreen/MainScreen';
import classes from './App.module.css';

class App extends Component {
  render(){
    return (
      <div className={classes.App}>
        <MainScreen />
      </div>
    );
  }
}

export default App;