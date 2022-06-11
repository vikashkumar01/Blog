import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import './post.css'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../context/Context'

export const Rpost = () => {

  const { user } = useContext(Context)

  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const [post, setPost] = useState({})

  const getPost = async () => {
    const res = await axios.get('https://blogwebba.herokuapp.com/api/posts/' + path)
    setPost(res.data.message)
  }

  useEffect(() => {

    getPost();

  }, [path])


  return (
    <div className="singlePost">
      <span>{post.title}</span>
      <div className="postDetails">

        <img src={post?.photo?.url? post?.photo?.url : "https://bitsofco.de/content/images/2018/12/broken-1.png"} alt="not found" />

        <div className="postDetail">

          <p>{post.description}</p>
        </div>
        <h3 className="author">Author:{post.username}</h3>
      </div>

    </div>
  )
}
