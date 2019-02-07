import React, { Component } from 'react';
import Film from './components/Film';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container mt-5">
          <Film />
        </div>

      </div>
    );
  }
}

export default App;
