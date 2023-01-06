import React,{useState }  from 'react'
import "./register.css"
import axios from 'axios'


export const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [error,setError] = useState(false)
 

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
   try{
    setError(false)
    const res= await axios.post('http://localhost:5000/api/v1/auth/register',{
      username,
      email,
      password,
      profilePic

    });
    res.data.user && window.location.replace('/login');
    }
    catch(err){
      setError(true)
    }

    
  }
  
  return (

    <div className='registerContainer'>
    <div className="register">
      <span className="registerTitle">Register</span>

       {profilePic && <img className="profilePic" src={profilePic} alt=""/>}
      <form className="registerForm" autoComplete="off" onSubmit={handleSubmit} >

        

        <label>ProfilePic</label>
        <input type="file" accept="image/*" className onChange={handleImageChange} required/>

        <label>Username</label>
        <input type="text" className="registerInput" onChange={e=>setUsername(e.target.value)} placeholder="Enter Your Username..." required></input>

        <label>Email</label>
        <input type="email" className="registerInput" onChange={e=>setEmail(e.target.value)} placeholder="Enter Your Email..." required></input>

        <label>Password</label>
        <input type="password" className="registerInput" onChange={e=>setPassword(e.target.value)} placeholder="Enter Your Password..." required />

        <button className="registerButton" type="submit">Register</button>

      </form>

     {error && <span style={{ color: 'red' ,marginTop:"10px"}}>Somthing Went Wrong!</span>}
    </div>
    </div>

  )
}
