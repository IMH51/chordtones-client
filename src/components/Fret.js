import React from 'react';
import './Fret.css'

const Fret = ({ buttonClass, stringValue, string, fret, changeFretNumber, finger}) => {
  const style = (stringValue === "X" && fret === 0) ? {backgroundImage: `url(${process.env.PUBLIC_URL + "./assets/x.svg"})`} : {}
  const onClick = e => changeFretNumber(string, fret)
  const fingerText = finger !== "X" && finger
  return (
    <div className="fret-container">
      <div className="fret-display-container" >
        <button className={buttonClass} {...{style, onClick}}>{fingerText}</button>
      </div>
    </div>
  )
}

export default Fret;
