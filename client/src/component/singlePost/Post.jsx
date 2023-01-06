import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import './post.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../context/Context'

export const Post = () => {

  const { user } = useContext(Context)

  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const [post, setPost] = useState({})

  const getPost = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/posts/' + path)
    setPost(res.data.message)
  }


  useEffect(() => {

    getPost();

  }, [path])

  const deletePost = async () => {

    try {
      await axios.delete('http://localhost:5000/api/v1/posts/' + path)
      window.location.replace('/');
    }
    catch (e) { }
  }

  return (
    <div className="singlePost">
      <span>{post.title}</span>
      <div className="postDetails">
        <img className='image' src={post?.photo?.url ? post?.photo?.url : "https://bitsofco.de/content/images/2018/12/broken-1.png"} alt="not found" />
        <div className="postDetail">

          <p>{post.description}</p>
        </div>
        <h3 className="author">Author:{post.username}</h3>
      </div>
      {(user.message.username === post.username) &&
        <>
          <Link to={`/upost/` + path}>
            <button className="updatebtn">Update Post</button>
          </Link>
          <button className="deletebtn" onClick={deletePost}>Delete Post</button>
        </>
      }


    </div>
  )
}
