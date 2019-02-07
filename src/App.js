import React, { Component } from 'react';
import Film from './components/Film';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Movie Pickr</h1>
        <Film />
      </div>
    );
  }
}

export default App;
