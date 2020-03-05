import React, {Component} from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import NETWORK from './config'

const network = NETWORK

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
        title: '',
        summary: '',
        to: '',
        error: false,
        errorMsg: '',
        added: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getData = this.getData.bind(this)
    if (this.props.type === "update") {
      this.getData()
    }
  }

  handleChange(event) {
    let name = event.target.name
    this.setState({ [name] : event.target.value })
  }

  getData() {
    const {id, url_link} = this.props
    // console.log("in here")
    fetch(`${network}/outgoing_proposals/${id}?token=${Cookies.get('pToken')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async (proposal) => {
      let a = await proposal.json()
      console.log(a)
      this.setState({
        title: a.title,
        summary: a.summary,
        to: a.recipient
      })
      
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleSubmit(event) {
    const payload = {
      title: this.state.title,
      summary: this.state.summary,
      token: Cookies.get('pToken'),
      recipient: this.state.to
    }
    let type = this.props.url_link
    const url = `${network}/${type}`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      let a = await res.json()
      console.log(a)
      if (a.status === 200) {
        this.setState({added: true})
      }
      if (a.status === 401) {
        this.setState({error: true})
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const {error, added} = this.state
    const {id} = this.props
    if (added) {
      if (this.props.type === "new") {
        return <Redirect to="/outgoing"/>
      } else {
        const url = `/outgoing/${id}`
        return <Redirect to={url}/>
      }
    }
    if (!Cookies.get('pToken')) {
      return <Redirect to="/login"/>
    }
    return (
      <form style={styles.form} onSubmit={(e) => {
        e.preventDefault()
        this.handleSubmit()
      }}>
        {error ? <p style={styles.label}>Failed to add!</p> : <></>}
        <p style={styles.type}>{this.props.type.toUpperCase()}</p>
        <label htmlFor="title" style={styles.label}>
          Title:
        </label>
        <input
          placeholder="Title"
          style={styles.input}
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
          name="title"
          id="title"
        />
        <label htmlFor="summary" style={styles.label}>
          Summary:</label>
        <textarea
          placeholder="Summary"
          style={styles.textarea}
          value={this.state.summary}
          onChange={this.handleChange}
          name="summary"
          id="summary"
        />
        <label htmlFor="to" style={styles.label}>
          To:
        </label>
        <input
          style={styles.input}
          type="text"
          value={this.state.to}
          onChange={this.handleChange}
          placeholder="username"
          name="to"
          id="to"
        />
        <button
          type="button"
          style={styles.button}
          to="/"
          onClick={this.handleSubmit}
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
    marginBottom: '1vh'
  },
  textarea: {
    height: '20vh',
    fontSize: '1em',
    padding: '0.2em',
    fontWeight: '300',
    marginBottom: '1vh'
  },
  label: {
    margin: '0',
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