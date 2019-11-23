import React, { Component } from 'react';
import './CollectionPage.css'

import Navbar from './Navbar'
import Fretboard from './Fretboard'

class CollectionPage extends Component {
  constructor() {
    super()

    this.state = {
      collection: [],
      selectedChord: null
    }

  }

  getUserChords = () => {
    return fetch('https://chordtones-backend.herokuapp.com/chords', {
        headers: { 'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')},
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
        this.setState({...this.state, collection: data})
        }
      })
  }

  onChangeChord = (index) => {
    this.setState({...this.state, selectedChord: this.state.collection[index]})
  }

  handleChordDelete = (chord_id) => {
    return fetch(`https://chordtones-backend.herokuapp.com/chords/${chord_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
        alert("Chord successfully deleted from your Collection!")
        this.setState({selectedChord: null, collection: [...data]})
        }
      })
  }

  componentDidMount() {
    if (!this.props.username) {
      this.props.history.push('/')
    } else {
    this.getUserChords()
    }
  }

  render() {
    return (
      <div className="collectionpage-container">
        <Navbar username={this.props.username} logout={this.props.logout} clearFretboard={this.props.clearFretboard} page={'search'}/>
        <div className="collection-page-wrapper">
        <div className="collection_wrapper">
          <p className="instruction-text">To view a chord from your collection, select it from the dropdown menu</p>
          <select name="chord-select" className="chord-select" onChange={(event) => this.onChangeChord(event.target.value)}>
          <option>Select A Chord</option>
          {this.state.collection.map(chord => <option key={chord.id} value={this.state.collection.indexOf(chord)}>{chord.chord_name.trim()}</option>)}
        </select>
        <Fretboard strings={this.props.strings} frets={this.props.frets} collection={this.state.collection} chord={this.state.selectedChord} query={this.state.selectedChord}/>
        <div className="delete-button-container">
        {this.state.selectedChord ? <button className="get-chord-button" onClick={() => this.handleChordDelete(this.state.selectedChord.id)}>Delete Chord from Collection</button>: null}
        </div>
        </div>
        </div>
      </div>
    )
  }

}

export default CollectionPage
