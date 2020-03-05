import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';



function Navbar(props) {
  return (
    <div style={styles.navbar}>
      <div style={styles.left}>
        <NavLink style={styles.titleFont} to="/">Proposaly</NavLink>
      </div>
      <div style={styles.right}>
        {
          Cookies.get('pToken') === undefined ? (<>
            <NavLink style={styles.font} to="/signup">Signup</NavLink>
            <NavLink style={styles.font} to="/login">Login</NavLink> 
          </>)
            :  
            <a 
            href="/" 
            style={styles.font} 
            onClick={() => {
              props.loggedIn(false)
              Cookies.remove('pToken')
            }}>Logout</a>
        }
      </div>
    </div>
  )
}

export default Navbar;

const styles = {
  navbar: {
    background: '#B8E1FF',
    maxWidth: '100vw',
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: '5vw',
    paddingRight: '5vw'

  },
  left: {
    justifySelf: 'flex-start'
  },
  right: {
    display:'flex',
    justifyContent: 'space-around'
  },
  font: {
    color: '#0A2342',
    margin: '.4em',
    fontSize: '1.2rem',
    fontWeight: '300',
    textDecoration: 'none'
  },
  titleFont: {
    color: '#333',
    fontSize: '1.6rem',
    fontWeight: '500',
    textDecoration: 'none'
  }

}