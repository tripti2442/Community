import './App.css';
import People from './components/People';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import Search from './components/BuddySearch';
import Home from './components/Home';
import Mainpage from './components/Mainpage';

export default class App extends Component {
  render() {
    return (
      <div>
        <Mainpage/>
      </div>
    )
  }
}
