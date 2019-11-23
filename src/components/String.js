import React, { Component } from 'react';
import Fret from './Fret'
import './String.css'
import './Fret.css'

class String extends Component {
  render() {
    return (
      <div className="string-container">
        {this.props.frets.map(fret => {
          const buttonClass = this.props.stringValue.toString() === fret.toString() ? 'fret-button-black' : 'fret-button-white';
          const finger = this.props.chord && buttonClass === 'fret-button-black' ? this.props.chord[`finger_${this.props.string.slice(-1)}`] : "";
          return <Fret
            key={"fret-" + fret}
            string={this.props.string}
            fret={fret}
            changeFretNumber = {this.props.changeFretNumber}
            buttonClass={buttonClass}
            finger={finger}
            stringValue={this.props.stringValue}
          />
        })}
      </div>
    )
  }
}

export default String;
