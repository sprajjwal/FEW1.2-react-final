import React, {Component} from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import Cookies from 'js-cookie';

import './App.css'
import Navbar from './navbar';
import Form from './form';
import Proposals from './proposals'
import Proposal from './proposal'
import NewForm from './newForm'
import Method from './method'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn : Cookies.get('pToken') ? true: false
    }

    this.loggedIn = this.loggedIn.bind(this)
  }

  loggedIn(what) {
    console.log("in here with", what)
    this.setState({isLoggedIn: what})
  }

  render(){
    const loggedIn = this.loggedIn;
    // const {isLoggedIn } = this.state
    return (
      <div className="App-body">
        <Router>
          <Navbar loggedIn={loggedIn}/>

          <Route exact path='/' component={() => {
            return (
            <div style={styles.row}>
              <div style={styles.head}>
                <Link to="/outgoing" style={styles.label}>All Outgoing Proposals:</Link>
                <Link to="/new" style={styles.button}>NEW</Link>
              </div>
              <div style={styles.container}>
                    <Proposals type="outgoing"/>
              </div>
          </div>) }} />
          
          <Route exact path='/' component={() => {
            return (
            <div style={styles.row}>
              <Link to="/incoming" style={styles.label}>All Incoming Proposals:</Link>
              <div style={styles.container}>
                    <Proposals type="incoming"/>
              </div>
          </div>) }} />
          <Route exact path='/login' component={() => <Form type="login" loggedIn={loggedIn}/>} />
          <Route exact path='/signup' component={() => <Form type="signup" loggedIn={loggedIn}/>} />
          <Route exact path='/outgoing' component={() => <Proposals type="outgoing" sub="true" />} />
          <Route exact path='/incoming' component={() => <Proposals type="incoming" sub="true" />} />
          <Route exact path='/new' component={() => {
            return <NewForm type='new' url_link="new_proposal"/>
          }} />


          <Route exact path='/incoming/:id' render={(props) => {
            const id = props.match.params.id;
            return <Proposal type="incoming" id={id}/>
          }}/>
          <Route exact path='/outgoing/:id' render={(props) => {
            const id = props.match.params.id;
            return <Proposal type="outgoing" id={id}/>
          }}/>

          <Route path='/outgoing/:id/update' render={(props) => {
            const id = props.match.params.id;
            const url_link = `outgoing_proposals/${id}/update`
            return <NewForm type="update" url_link={url_link} id={id}/>
          }}/>

          <Route path='/outgoing/:id/delete' render={(props) => {
            const id = props.match.params.id;
            const url_link = `outgoing_proposals/${id}`
            return <Method type="delete" url={url_link}/>
          }}/>

          <Route path='/incoming/:id/approve' render={(props) => {
            const id = props.match.params.id;
            const url_link = `incoming_proposals/${id}`
            return <Method type="approve" url={url_link} id={id}/>
          }}/>

          <Route path='/incoming/:id/deny' render={(props) => {
            const id = props.match.params.id;
            const url_link = `incoming_proposals/${id}`
            return <Method type="deny" url={url_link} id={id}/>
          }}/>
          
        </Router>
      </div>
    );
  }
}

export default App;

const styles = {
  container: {
    display: 'flex',
    overflow: 'scroll',
    flexDirection: 'row',
    marginTop: '5px',
    height: '30vh',
    width: '70vw',
    paddingTop: '0',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #9796f0, #fbc7d4)'
  },
  row: {
    width: '71vw',
    margin: 'auto',
    padding: '0',
    marginTop: '5vh',
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
  },
  label : {
    margin: '0',
    color: '#F87060',
    textDecoration: 'none'
  },
  button : {
    float: 'right',
    textDecoration: 'none',
    fontSize: '1em',
    color: '#102542',
    fontWeight: '500',
    border: '2px solid #102542',
    backgroundColor: 'white',
    borderRadius: '15px',
    width: '3em',
    textAlign: 'center',
    padding: '0'
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
}