import React, { Component } from 'react';

import Fretboard from './Fretboard'
import Navbar from './Navbar'
import './SearchPage.css'

class SearchPage extends Component {

  componentDidMount() {
    if (!this.props.username) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div className="searchpage-container">
        <Navbar username={this.props.username} logout={this.props.logout} clearFretboard={this.props.clearFretboard} page={this.props.page}/>
        <div className="fretboard_wrapper">
          <div className="search-fretboard-container">
          <p className="instruction-text">Select your frets (or 'x' for open strings) then click 'Get Chord Name' to get more information and save to your collection</p>
          <div className="cord-wrapper">
            <h1>{this.props.chord ? this.props.chord.chord_name.trim() : ""}</h1>
          </div>
          <Fretboard query={this.props.query} strings={this.props.strings} frets={this.props.frets} changeFretNumber={this.props.changeFretNumber} chord={this.props.chord}/>
          <div className="chord-button-container">
          <button className="get-chord-button" onClick={() => this.props.getChordName()}>Get Chord Name</button>
          <button className="clear-fretboard-button" onClick={() => this.props.clearFretboard()}>Clear Fretboard</button>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchPage;
