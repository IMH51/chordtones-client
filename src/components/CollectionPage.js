import React, { Component } from 'react';
import './CollectionPage.css'

import Navbar from './Navbar'
import Fretboard from './Fretboard'
import API from '../helpers/API';

class CollectionPage extends Component {
  
  state = {
      collection: [],
      selectedChord: null
    }

  getUserChords = () => {
   API.get(API.userChordsUrl)
    .then(collection => {
        if (collection.error) {
          alert(collection.error)
        } else {
        this.setState({ collection })
      }
    })
  }

  onChangeChord = i => {
    this.setState({selectedChord: this.state.collection[i]})
  }

  handleChordDelete = id => {
    API.destroy(API.chordsUrl, id)
      .then(collection => {
        if (collection.error) {
          alert(collection.error)
        } else {
          alert("Chord successfully deleted from your Collection!")
          this.setState({selectedChord: null, collection })
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
    const { collection, selectedChord } = this.state
    const { username, logout, clearFretboard} = this.props
    const {onChangeChord, handleChordDelete} = this
    const onClickDelete = () => handleChordDelete(selectedChord.id)
    return (
      <div className="collectionpage-container">
        <Navbar page='Search' {...{username, logout, clearFretboard}} />
        <div className="collection-page-wrapper">
        <div className="collection_wrapper">
          <p className="instruction-text">To view a chord from your collection, select it from the dropdown menu</p>
          <select name="chord-select" className="chord-select" onChange={e => onChangeChord(e.target.value)}>
          <option>Select A Chord</option>
          {collection.map((chord, i) => <option key={chord.id} value={i}>{chord.chord_name.trim()}</option>)}
        </select>
        <Fretboard {...{collection}} chord={selectedChord} query={selectedChord}/>
        <div className="delete-button-container">
        {selectedChord && <button className="get-chord-button" onClick={onClickDelete}>Delete Chord from Collection</button>}
        </div>
        </div>
        </div>
      </div>
    )
  }

}

export default CollectionPage
