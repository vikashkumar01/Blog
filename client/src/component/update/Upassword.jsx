import React, { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import { useContext } from 'react'
import { Context } from '../context/Context'

export const Upassword = () => {

    const {dispatch} = useContext(Context)

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)

    const location = useLocation()
    const path = location.pathname.split('/')[2]

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)

        if (newPassword === confirmPassword) {

            try {
                await axios.put('https://blogwebba.herokuapp.com/api/users/updatepassword/' + path, {
                    newPassword
                })
                dispatch({ type: "LOGOUT" })
                window.location.replace('/login');
            }
            catch (e) {
                setError(true)
            }
        }
        else {
            setMessage(true)
        }



    }

    return (
        <div className="profileEdit">
            <form className="formControl1" onSubmit={handleSubmit}>
                <h2 className="title">Update Your Password</h2>
                <input className="input" type="password" placeholder="New Password" onChange={e => setNewPassword(e.target.value)} required />
                <input className="input" type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} required />

                <button className="btn1" type="submit">Update Password</button>
            </form>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                {message && <span style={{ color: 'red', marginTop: "10px" }}>Password do not match!</span>}
                {error && <span style={{ color: 'red', marginTop: "10px" }}>Somthing Went Wrong!</span>}
            </div>
        </div>
    )
}

export default Upassword