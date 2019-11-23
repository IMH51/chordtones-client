import React, { Component } from 'react';
import String from './String'
import './Fretboard.css'

class Fretboard extends Component {

  markers = [3,5,7,9,12,15,17,19,21,24]

  render() {
    return (
      <div className="fretboard-element-container">
      <div className="fretboard-container">
          {this.props.strings.map(string => < String key={"string_" + string} string={"string_" + string} frets={this.props.frets} stringValue={this.props.query ? this.props.query["string_" + string] : "X"} chord={this.props.chord} changeFretNumber={this.props.changeFretNumber}/>)}
      </div>
      <div className="fretboard-number-labels">
        {this.props.frets.map(fret => <p key={"fret-marker-" + fret} className={this.markers.includes(fret) ? "marker-label" : "non-marker-label"}>{this.markers.includes(fret) ? fret : " "}</p>)}
      </div>
      </div>
    )
  }
}

export default Fretboard;
