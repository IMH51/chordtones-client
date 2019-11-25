import React from 'react';
import Fret from './Fret'
import './String.css'
import './Fret.css'

const String = ({ frets, string, stringValue, chord, changeFretNumber }) => (
    <div className="string-container">
    {frets.map(fret => {
      const buttonClass = stringValue.toString() === fret.toString() ? 'fret-button-black' : 'fret-button-white';
      const finger = (chord && buttonClass === 'fret-button-black') && chord[`finger_${string.slice(-1)}`]
      const key = `fret-${fret}`
      return <Fret {...{key, string, fret, changeFretNumber, buttonClass, finger, stringValue}} />
    })}
  </div>
)


export default String;
