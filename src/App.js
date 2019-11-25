import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SearchPage from './components/SearchPage'
import CollectionPage from './components/CollectionPage'
import HomePage from './components/HomePage'
import API from './helpers/API'

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

  state = initialState

  login = (username, token) => {
    this.setState({ username })
    localStorage.setItem('token', token)
  }

  logout = () => {
    this.setState(initialState)
    localStorage.removeItem('token')
  }

  changeFretNumber = (string, fret) => {
    const newQuery = {...this.state.query}
    newQuery[string] === fret ? newQuery[string] = "X" : newQuery[string] = fret
    this.setState({chord: null, query: newQuery})
  }

  clearFretboard = () => {
    this.setState({...initialState, username: this.state.username})
}

  getChordName = () => {
    API.post(API.newChordUrl, this.state.query)
    .then(chord => {
      if (chord.error) {
        alert(chord.error)
      } else {
      this.setState({ chord })
      }
    })
  }

  render() {
    const { username, query, chord } = this.state
    const { login, logout, changeFretNumber, clearFretboard, getChordName } = this
    return (
      <Router>
        <Switch>
          <Route path='/' 
                 component={props => <HomePage {...{...props, login}} />} exact/>
          <Route path='/search' 
                 component={props => <SearchPage page="collection" {...{...props, username, logout, query, chord, clearFretboard, changeFretNumber, getChordName }}/>} />
          <Route path='/collection' 
                 component={props => <CollectionPage {...{...props, username, logout, clearFretboard}} />} />
        </Switch>
      </Router>
    )
  }

}

export default App;
