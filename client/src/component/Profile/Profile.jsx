import React,{useState, useEffect} from 'react'
import './profile.css'
import { useContext } from 'react'
import { Context } from '../context/Context'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Profile = () => {

  const { user, dispatch } = useContext(Context)
  const [profile,setProfile] = useState("")


  const getUser = async() =>{
      
    const res = await axios.get('http://localhost:5000/api/v1/users/' + user.message._id )
    setProfile(res.data.message)
    
  }

  useEffect(() =>{
    getUser()
  },[])


  const deleteProfile = async () => {
    try {
      await axios.delete('http://localhost:5000/api/v1/users/' + user.message._id)
      dispatch({ type: "LOGOUT" })
      window.location.replace('/login');
    }
    catch (e) { }
  }

  return (
    <div className="profile">
      <h1 style={{"color":"lightcoral"}}>Profile</h1>
      <img className="profilePic1" src={profile?.profilePic?.url} alt="" />

      <div className="profileInfo">
        <h3>{profile.username}</h3>
        <h3>{profile.email}</h3>
      </div>

      <div className="btn">

          <Link to={`/Uprofile/${user.message._id}`}><button className="btndesign">Update Profile</button></Link>
          <Link to={`/Upassword/${user.message._id}`}><button className="btndesign">Update Password</button></Link>
          <button className="btndesign" onClick={deleteProfile}>Delete Profile</button>


      </div>

    </div>
  )
}
