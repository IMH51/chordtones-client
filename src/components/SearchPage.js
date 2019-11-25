import React, { useEffect } from 'react';

import Fretboard from './Fretboard'
import Navbar from './Navbar'
import './SearchPage.css'

const SearchPage = ({ username, logout, clearFretboard, chord, query, changeFretNumber, getChordName, history }) => {
  
  useEffect(() => {
    !username && history.push('/')
  }, [])

  return (
    <div className="searchpage-container">
      <Navbar page="Collection" {...{ username, logout, clearFretboard, }}/>
      <div className="fretboard_wrapper">
        <div className="search-fretboard-container">
          <p className="instruction-text">
            Select your frets (or 'x' for open strings) then click 'Get Chord Name' to get more information and save to your collection.
          </p>
          <div className="cord-wrapper">
            <h1>{chord && chord.chord_name.trim()}</h1>
          </div>
          <Fretboard {...{query, changeFretNumber, chord}}/>
           <div className="chord-button-container">
            <button className="get-chord-button" onClick={getChordName}>Get Chord Name</button>
            <button className="clear-fretboard-button" onClick={clearFretboard}>Clear Fretboard</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage;
