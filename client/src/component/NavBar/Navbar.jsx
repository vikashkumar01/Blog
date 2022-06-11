import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"
import { useContext } from 'react'
import { Context } from '../context/Context'



const Navbar = () => {

  const { user, dispatch } = useContext(Context)

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

  return (
    <div className="top">
      <div className="topLeft">
        <span className="topTitle"><Link to='/'>BLOG</Link></span>
      </div>
      <div className="topRight">
        {user ?
          <>
            <ul className="topList">
              <li className="topListItem"><Link className="link" to="/">HOME</Link></li>
              <li className="topListItem"><Link className="link" to="/about">ABOUT</Link></li>
              <li className="topListItem"><Link className="link" to="/write">WRITE</Link></li>
              <li className="topListItem"><Link className="link" to="/profile">PROFILE</Link></li>
              <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
            </ul>
          </>
          :
          <>
            <ul className="topList">
              <li className="topListItem"><Link className="link" to="/">HOME</Link></li>
              <li className="topListItem"><Link className="link" to="/about">ABOUT</Link></li>
              <li className="topListItem"><Link className="link" to="/register">REGISTER</Link></li>
              <li className="topListItem"><Link className="link" to="/login">LOGIN</Link></li>
            </ul>

          </>

        }



      </div>
    </div>
  )
}

export default Navbar