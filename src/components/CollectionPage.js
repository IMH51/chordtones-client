import React, { useState, useEffect } from 'react';
import './CollectionPage.css'

import Navbar from './Navbar'
import Fretboard from './Fretboard'
import API from '../helpers/API';

const CollectionPage = ({ username, logout, clearFretboard, history}) => {

  const [collection, setCollection] = useState([])
  const [selectedChord, setSelectedChord] = useState(null)

  const getUserChords = () => {
   API.get(API.userChordsUrl)
    .then(collection => {
        if (collection.error) {
          alert(collection.error)
        } else {
        setCollection(collection)
      }
    })
  }

  const onChangeChord = i => setSelectedChord(collection[i])

  const handleChordDelete = id => {
    API.destroy(API.chordsUrl, id)
      .then(collection => {
        if (collection.error) {
          alert(collection.error)
        } else {
          alert("Chord successfully deleted from your Collection!")
          setSelectedChord(null)
          setCollection(collection)
        }
      })
  }

  const onClickDelete = () => handleChordDelete(selectedChord.id)

  useEffect(() => {
      if (!username) {
        history.push('/')
      } else {
        getUserChords()
      }
    }, [])

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

export default CollectionPage
