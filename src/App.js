import React, { Component } from 'react';
import './App.css';

import Fetch from './components/fetch/Fetch';
import Modal from './components/layout/Modal';


class App extends Component {
  render() {
    return (
      <div>
        <Modal />
        <div className="App container pt-5">
          <Fetch />
        </div>
      </div>
    )
  }
}

export default App;