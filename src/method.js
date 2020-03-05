import React, {Component} from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import NETWORK from './config'

const network = NETWORK

class Method extends Component {
  constructor(props) {
    super(props)
    this.state ={ 
      isCompleted: false
    }
    this.helper = this.helper.bind(this)
  }

  helper() {
    const {type, url} = this.props
    const payload = {
      token: Cookies.get('pToken')
    }
    const url_link = `${network}/${url}/${type}`
    fetch(url_link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      await res.json()
      this.setState({isCompleted: true})
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  render() {
    this.helper()
    const {type, id} = this.props
    const {isCompleted} = this.state
    if (Cookies.get('pToken') === null) {
      return <Redirect to='/'/>
    }
    if (type === 'approve' || type === 'deny' ) {
      const url_link = type === 'approve' ? `/incoming/${id}` : `/incoming/${id}`
      return <Redirect to={url_link}/>
    }
    if (isCompleted) {
      return <Redirect to='/'/>
    }

    return <></>
  }
}


export default Method
