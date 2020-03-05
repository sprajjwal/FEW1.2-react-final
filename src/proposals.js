import React, {Component} from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import NETWORK from './config'

const network = NETWORK

class Proposals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      proposals: [],
      isEmpty: true
    }
    this.getProposal()
  }

  getProposal() {
    const a = this.props.type
    fetch(`${network}/${a}_proposals?token=${Cookies.get('pToken')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async (res) => {
      let a = await res.json()
      if (a['status'] === 401) {
        this.setState({isEmpty: true})
      } else {
        this.setState({proposals: a['proposals'], isLoading:false, isEmpty: false})
      }
    })
    .catch(err => {
      console.log(err)
      return (<></>)
    })
  }

  render() {
    const a = this.props.type
    const {isLoading, proposals, isEmpty } = this.state;
    if (isLoading && Cookies.get('pToken') === undefined) {
      return (
        <p style={styles.warning}>loading</p>
      )
    }
    if (isEmpty) {
      return (
        <div>
          {this.props.sub === "true"? <h1 style={styles.head}>ALL {this.props.type.toUpperCase()} PROPOSALS</h1>:<></>}
          <p style={styles.warning}>We got nothing here chief</p>
        </div>
        
      )
    }
    return (
      <div style={styles.container}>
        {this.props.sub === "true"? <h1 style={styles.head}>ALL {this.props.type.toUpperCase()} PROPOSALS</h1>:<></>}
        {proposals.map((pro, i) => {
          return (
            <div key={i} style={styles.card}>
              <Link 
              style={styles.title}
              to={`/${a}/${i}`}
              >{pro.title}</Link>
              {pro.approved ? <p style={styles.approved}>Approved</p> : <></>}
              {pro.denied ?<p style={styles.denied}>Denied</p> : <></>}
              {!pro.approved && !pro.denied? <p style={styles.pending}>Pending</p> : <></>}
              {this.props.type === 'incoming' ? 
                <p style={styles.body}>@{pro.author}</p>
                :
                <p style={styles.body}>@{pro.recipient}</p>
          }
            </div>
          )
        }
        )}
      </div>
    )
  }
}

export default Proposals;

const styles = {
  container: {
    margin: 'auto',
    marginTop: '10px',
    width: '69vw',
    paddingTop: '0',
  },
  card: {
    border: '1px solid black',
    width:'100%',
    height: '4vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: '5px',
    alignItem: 'flex-end'
  },
  title: {
    margin: '0',
    maxWidth: '100%',
    fontWeight: '500',
    padding: '0 10px',
    fontSize: '1em'
  },
  body: {
    margin: '0',
    textAlign: 'right',
    padding: '0 10px',
    fontWeight: '200',
    fontSize: '1em',
    color: 'red'
  },
  head: {
    color: '#4CE0D2',
    textAlign: 'center'
  },
  approved: {
    color: 'green',
    margin: '0',
    fontWeight: '300'
  },
  denied: {
    color: 'red',
    margin: '0',
    fontWeight: '300'
  },
  pending: {
    color: '#343F3E',
    margin: '0',
    fontWeight: '300'
  },
  warning: {
    color: 'black',
    margin: 'auto'
  }
}