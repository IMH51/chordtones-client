class Api {

  baseUrl = 'https://chordtones-backend.herokuapp.com'
  loginUrl = `${this.baseUrl}/login`
  signupUrl = `${this.baseUrl}/signup`
  newChordUrl = `${this.baseUrl}/chord`
  userChordsUrl = `${this.baseUrl}/user/chords`
  chordsUrl = `${this.baseUrl}/chords`

  headers = () => {
    return {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('token')
    }
  }

  responseToJSON = response => response.json()

  get = url => {
    return fetch(url, {
      headers: this.headers()
    })
    .then(this.responseToJSON)
  }

  post = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify(data)
      })
    .then(this.responseToJSON)
  }

  destroy = (url, id) => {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: this.headers()
    })
    .then(this.responseToJSON)
  }
}

const API = new Api()

export default API