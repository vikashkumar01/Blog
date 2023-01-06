import React, { useState } from 'react'
import './write.css'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../context/Context'


export const Write = () => {

  const { user } = useContext(Context)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [postPic, setpostPic] = useState("")


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onloadend = () => {
      if (Reader.readyState === 2) {
        setpostPic(Reader.result);
      }
    };
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const newPost = {
      title,
      description,
      photo: postPic,
      username: user.message.username,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/v1/posts', newPost)
      res.data && window.location.replace('/');
    }
    catch (e) {
      console.log(e)
    }

  };


  return (
    <div className="write">

      <h1 style={{ "color": "lightcoral" }}>Write Your Blog</h1>

      {postPic && (
        <img className="writeImg" src={postPic} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput"><i className=" writeIcon fa-solid fa-plus"></i>
          </label>
          <input type='file' id='fileInput' accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
          <input type='text' placeholder="Title" onChange={e => setTitle(e.target.value)} className="writeInput" />
          <textarea type="text" placeholder="Write Your Blog" onChange={e => setDescription(e.target.value)} className=" writeText" />
        </div>
        <button className="writeSubmit" type="submit">Publish</button>
      </form>

    </div>
  )

}
