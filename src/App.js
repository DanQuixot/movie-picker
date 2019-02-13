import React, { Component } from 'react';
import './App.css';
import Fetch from './components/fetch/Fetch';

class App extends Component {
  render() {
    return (
      <div className="App container pt-5">
        <Fetch />
      </div>
    )
  }
}

export default App;