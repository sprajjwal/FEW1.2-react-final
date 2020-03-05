import React, {Component} from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import NETWORK from './config'

const network = NETWORK

class Proposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      type: this.props.type,
      proposal: {},
      isLoading: true,
      isEmpty: false
    }
    this.getProposal()
  }

  getProposal() {
    const {type,id } = this.state
    const url = `${network}/${type}_proposals/${id}`
    fetch(`${url}?token=${Cookies.get('pToken')}`, {
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
        this.setState({proposal: a, isLoading:false, isEmpty: false})
      }
    })
    .catch(err => {
      console.log(err)
      this.setState({isEmpty: true})
    })
  }

  render() {
    const {proposal, isLoading, isEmpty, type, id} = this.state;
    if (isLoading && Cookies.get('pToken') === undefined) {
      return (
        <p style={styles.warning}>loading</p>
      )
    }
    if (isEmpty) {
      return (
        <h1 style={styles.warning}>We got nothing here chief</h1>
      )
    }
    const update_link = `/outgoing/${id}/update`
    const delete_link = `/outgoing/${id}/delete`
    const approve_link = `/incoming/${id}/approve`
    const deny_link = `/incoming/${id}/deny`
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>{proposal.title}</h3>
        {type === "incoming"?
          <p style={styles.by}>by: @{proposal.author}</p>
          :
          <p style={styles.by}>to: @{proposal.recipient}</p>
        }
        {proposal.approved ? <p style={styles.approved}>Status: Approved</p> : <></>}
        {proposal.denied ?<p style={styles.denied}>Status: Denied</p> : <></>}
        {!proposal.approved && !proposal.denied? <p style={styles.pending}>Status: Pending</p> : <></>}
        {this.props.type=== 'outgoing' ? 
        <div style={styles.buttons}>
          <Link to={update_link} style={styles.update}>Update</Link>
          <Link to={delete_link} style={styles.delete}>Delete</Link>
        </div>
        : <></>}
        {this.props.type=== 'incoming' ? 
        <div style={styles.buttons}>
          <Link to={approve_link} style={styles.approved}>Approve</Link>
          <Link to={deny_link} style={styles.denied}>Deny</Link>
        </div>
        : <></>}
        <br></br>
        <p style={styles.body}>{proposal.summary}</p>
      </div>
    );
  }
}

export default Proposal;

const styles = {
  container: {
    width: '80vw',
    margin: '50px auto',
    display: 'flex',
    flexDirection: 'column'
  },
  title:{
    textAlign: 'center',
    margin: '0',
    color: 'black',
    fontStyle: 'underline'
  },
  by: {
    textAlign: 'center',
    margin: '0',
    color: 'black',
    fontStyle: 'italic',
    fontWeight: '300'
  },
  body: {
    margin: '0',
    color: 'black',
    minHeight: '50vh',
    fontWeight: '300'
  },
  update: {
    textDecoration: 'none',
    color: 'pink'
  },
  delete: {
    textDecoration: 'none',
    color: 'blue'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '7em',
    alignSelf: 'flex-end'
  },
  approved: {
    textAlign: 'center',
    margin: '0',
    color: 'green'
  },
  denied: {
    textAlign: 'center',
    margin: '0',
    color: 'red'
  },
  pending: {
    color: '#343F3E',
    margin: '0',
    fontWeight: '300',
    textAlign: 'center',
  },
  warning : {
    color: 'black',
    margin: 'auto'
  }
}