import './App.css';
import People from './components/People';
import React, { Component } from 'react'
import Search from './components/Search';
import Home from './components/Home';

export default class App extends Component {
  render() {
    return (
      <div>
        <Home/>
      </div>
    )
  }
}
