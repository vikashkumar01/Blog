import React, { useContext, useRef, useState } from 'react'
import "./login.css"
import { Context } from '../context/Context';
import axios from 'axios'

export const Login = () => {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const {dispatch ,error} = useContext(Context)
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch({type:"LOGIN_START"})

    try{
      
      const res= await axios.post('http://localhost:5000/api/v1/auth/login',{
        email:emailRef.current.value,
        password:passwordRef.current.value
  
      });
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
      window.location.replace('/')
    }
    catch(err){
      dispatch({type:"LOGIN_FAILURE"})
    }
  };


  return (
    <div className='loginContainer'>
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" className="loginInput" ref={emailRef} placeholder="Enter Your Email..." required></input>

        <label>Password</label>
        <input type="password" className="loginInput" ref={passwordRef} placeholder="Enter Your Password..." required/>

        <button className="loginButton" type="submit" >Login</button>

      </form>

      {error && <span style={{ color: 'red' ,marginTop:"10px"}}>Somthing Went Wrong!</span>}
    </div>
    </div>
  )
};
