import React, {Component} from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import NETWORK from './config'

const network = NETWORK

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        password: '',
        r: 'false'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    let name = event.target.name
    this.setState({ [name] : event.target.value })
  }

  handleSubmit(event) {
    const payload = {
      username: this.state.username,
      password: this.state.password
    }
    const a = this.props.type
    const url = `${network}/${a}`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      let a = await res.json()
      if (a.token === undefined) {
        this.props.loggedIn(false)
      } else {
        Cookies.set('pToken', a.token)
        this.props.loggedIn(true)
        
      }
    })
    .catch(err => {
      console.log(err)
    })
  }


  render() {
    if (Cookies.get('pToken') != null) {
      return <Redirect to="/"/>
    }
    return (
      <form style={styles.form} onSubmit={(e) => {
        e.preventDefault()
        this.handleSubmit()
      }}>
        <p style={styles.type}>{this.props.type.toUpperCase()}</p>
        <label htmlFor="username" style={styles.label}>
          Username:
        </label>
        <input
          type="text"
          style={styles.input}
          value={this.state.username}
          onChange={this.handleChange}
          name="username"
        />
        <label htmlFor="password" style={styles.label}>
          Password:
        </label>
        <input
          style={styles.input}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          id="password"
          name="password"
        />
        <button
          type="submit"
          style={styles.button}
          // onClick={this.handleSubmit}
        >Submit</button>
      </form>
    )
  }
}

export default Form;

const styles = {
  form: {
    minHeight: '65vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    border: '3px solid gray',
    borderRadius: '15px',
    background: '#94FBAB',
    width: '70vw', 
    margin: '8vh auto',
    padding: '0 5%'
  },
  input: {
    height: '4vh',
    fontSize: '1em',
    padding: '0.2em',
    fontWeight: '300',
    marginBottom: '4.5vh'
  },
  label: {
    margin: '10px 0',
    fontWeight: '400',
    color: '#db6f6e'
  },
  button: {
    marginTop: '20px',
    alignSelf: 'center',
    width: '8em',
    height: '1.7em',
    fontSize: '1.3em',
    Color: 'gray',
    borderRadius: '20px',
    backgroundColor: '#e8c45f',
    fontWeight: '300'
  },
  type: {
    textAlign: 'center',
    fontSize: '1.6em',
    color: '#F87060',
    fontWeight: '400'
  }
}