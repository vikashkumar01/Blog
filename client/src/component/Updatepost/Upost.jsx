import React, { useState,useEffect } from 'react'
import '../Write/write.css'
import axios from 'axios'
import {useContext} from 'react'
import {Context} from '../context/Context'
import { useLocation } from 'react-router'



export const Upost = () =>{

  const {user} = useContext(Context)

  const location = useLocation()
  const path = location.pathname.split('/')[2]

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)

  const getPost = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/posts/' + path)
    setTitle(res.data.message.title)
    setDescription(res.data.message.description)
  }

  useEffect(() => {

    getPost();

  }, [path])
 

  const handleSubmit = async (e) => {

    e.preventDefault();
    const newPost = {
      username: user.message.username,
      title,
      description,
    };
    
    try {
      const res = await axios.put('http://localhost:5000/api/posts/' + path, newPost)
      res.data && window.location.replace('/');
     }
    catch (e) { }

  };




  return (
    <div className="write">

      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput"><i className=" writeIcon fa-solid fa-plus"></i>
          </label>
          <input type='file' id='fileInput' onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
          <input type='text' placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="writeInput" />
        </div>
        <div className="writeFormGroup">
          <textarea type="text" placeholder="Write Your Blog" value={description} onChange={e => setDescription(e.target.value)} className="writeInput writeText" />
        </div>
        <button className="writeSubmit" type="submit">Update</button>
      </form>
    </div>
  )
      
}
