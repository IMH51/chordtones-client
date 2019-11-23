import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SearchPage from './components/SearchPage'
import CollectionPage from './components/CollectionPage'
import HomePage from './components/HomePage'

const initialState = {
  username: '',
  query: {
    string_1: "X",
    string_2: "X",
    string_3: "X",
    string_4: "X",
    string_5: "X",
    string_6: "X"
  },
  chord: null,
}

class App extends Component {

  constructor() {
    super()

    this.state = initialState

    this.strings = [1,2,3,4,5,6]
    this.frets = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]

  }

  login = (username, token) => {
    this.setState({...initialState, username: username })
    localStorage.setItem('token', token)
  }

  logout = () => {
    this.setState({...initialState})
    localStorage.removeItem('token')
  }

  changeFretNumber = (string, fret) => {
    const newQuery = JSON.parse(JSON.stringify(this.state.query))
    newQuery[string] === fret ? newQuery[string] = "X" : newQuery[string] = fret
    this.setState({...this.state, chord: null, query: newQuery})
  }

  clearFretboard = () => {
    this.setState({...initialState, username: this.state.username})
}

  getChordName = () => {
    fetch('https://chordtones-backend.herokuapp.com/chord', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('token')
         },
         body: JSON.stringify({...this.state.query})
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
        this.setState({...this.state, chord: data})
        }
      })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' component={props => <HomePage {...props} login={this.login}/>} exact/>
          <Route path='/search' component={props => <SearchPage {...props} username={this.state.username} logout={this.logout} strings={this.strings} frets={this.frets} query={this.state.query} chord={this.state.chord} clearFretboard={this.clearFretboard} changeFretNumber={this.changeFretNumber} getChordName={this.getChordName} page={"collection"}/>} />
          <Route path='/collection' component={props => <CollectionPage {...props} username={this.state.username} logout={this.logout} clearFretboard={this.clearFretboard} strings={this.strings} frets={this.frets}/>} />
        </Switch>
      </Router>
    )
  }

}

export default App;
