import React, { useState } from 'react'
import './update.css'
import { useContext } from 'react'
import { Context } from '../context/Context'
import axios from 'axios'
import { useLocation } from 'react-router'

export const Uprofile = () => {

    const { user } = useContext(Context)
    const location = useLocation()
    const path = location.pathname.split('/')[2]

    const [username, setUsername] = useState(user.message.username)
    const [email, setEmail] = useState(user.message.email)
    const [profilePic, setProfilePic] = useState(user.message.profilePic.url)

   
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onloadend = () => {
            if (Reader.readyState === 2) {
                setProfilePic(Reader.result);
            }
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const res = await axios.put('https://blogwebba.herokuapp.com/api/users/updateprofile/' + path,{
                username,
                email,
                profilePic
            })
            res.data && window.location.replace('/profile');
        }
        catch (e) { 

        }
    }

    return (
        <div className="profileEdit">
            <h2 className="title">Update Your Profile</h2>

            <div className="imgContainer">
                <img className="img1" src={profilePic} alt="" />
                <span>ProfilePic</span>
            </div>
            <form className="formControl1" onSubmit={handleSubmit}>

                <input className="file" type="file" accept="image/*" onChange={handleImageChange} required />
                <input className="input" type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} required value={username} />
                <input className="input" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required value={email} />

                <button className="btn1">Update Profile</button>
            </form>
        </div>
    )
}
