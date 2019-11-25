import React, { Component } from 'react';
import './HomePage.css'

const initialState = {
  username: '',
  password: ''
}

class HomePage extends Component {

  state = initialState

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  onClickLogin = e => {
  e.preventDefault()
  fetch('https://chordtones-backend.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(this.state)
    }).then(resp => resp.json())
      .then(data => {
        if (data.error) {
          this.setState(initialState)
          alert(data.error)
        } else {
          this.props.login(this.state.username, data.token)
          this.props.history.push('/search')
        }
      })
  }

  onClickSignup = event => {
  event.preventDefault()
    if (!this.state.username || !this.state.password) {
      alert('Username and Password fields must both be filled in.')
    } else {
      fetch('https://chordtones-backend.herokuapp.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(this.state)
    }).then(resp => resp.json())
      .then(data => {
          if (data.error) {
            this.setState(initialState)
            alert(data.error)
          } else {
            this.props.login(this.state.username, data.token)
            this.props.history.push('/search')
          }
        })
    }
  }

  render() {
  const { username, password } = this.state
  const { handleChange, onClickLogin, onClickSignup } = this
  return (
        <div className='homepage-container'>
          <div className="content-container">
          <div className="logo-container">
            <div className="logo-img-container">
              <img src="assets/chordtones-icon-white.png" alt="chordtones Logo" />
            </div>
            <h1>chordTones</h1>
            <h4>Your personal guitar chord library</h4>
          </div>
          <div className="homepage-info-container">
            <h3 className="homepage-info-text">Discovered a cool new chord by accident?</h3>
            <h3 className="homepage-info-text">Use chordTones to look it up and save it to your collection!</h3>
          </div>
          </div>
          <div className='homepage-form'>
          <form>
            <div className="homepage-form-inputs">
            <input onChange={handleChange} type="text" placeholder='Username' name="username" value={username} />
            <input onChange={handleChange} type="password" placeholder='Password' name="password" value={password} />
            </div>
            <div className="homepage-form-buttons">
            <button onClick={onClickLogin}>Login</button>
            <button onClick={onClickSignup}>Sign Up</button>
            </div>
          </form>
          </div>
        </div>
        )
      }

}
export default HomePage
