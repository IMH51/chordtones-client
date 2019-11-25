import React from 'react';
import String from './String'
import './Fretboard.css'

const Fretboard = ({ strings, frets, chord, query, changeFretNumber }) => {
  const markers = [3,5,7,9,12,15,17,19,21,24]
  return (
    <div className="fretboard-element-container">
      <div className="fretboard-container">
        {strings.map(string => {
          const stringName = `string_${string}`
          const stringValue = query ? query[stringName] : "X"
          return < String key={stringName} string={stringName} {...{frets, stringValue, chord, changeFretNumber}}/>
        })}
      </div>
      <div className="fretboard-number-labels">
        {frets.map(fret => {
          const fretClass = `${markers.includes(fret) && "non-"}marker-label`
          const markerText = markers.includes(fret) ? fret : " "
          return <p key={"fret-marker-" + fret} className={fretClass}>{markerText}</p>
        })}
      </div>
    </div>
  )
}

export default Fretboard;
