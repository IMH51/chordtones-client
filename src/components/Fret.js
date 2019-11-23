import React, { Component } from 'react';
import './Fret.css'

class Fret extends Component {

  render() {
    return (
      <div className="fret-container">
        <div className="fret-display-container" >
        <button className={`${this.props.buttonClass}`} style={this.props.stringValue === "X" && this.props.fret === 0 ? {backgroundImage: `url(${process.env.PUBLIC_URL + "./assets/x.svg"})`} : null} onClick={(event) => this.props.changeFretNumber(this.props.string, this.props.fret)}>{this.props.finger === "X" ? "" : this.props.finger}</button>
        </div>
      </div>
    )
  }
}

export default Fret;
