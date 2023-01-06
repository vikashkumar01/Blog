import React, { useState, useEffect } from 'react'
import './home.css'
import axios from 'axios';
import { Link } from 'react-router-dom'

export const Home = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://localhost:5000/api/v1/posts')
      setPosts(res.data.message)
    }
    fetchPosts();
  }, [])


  return (
    <div className="container">
      <div>
        <span>BLOG</span>
      </div>

      <div className="margin1">

        {
          posts.length > 0 ? posts.map((p) => (
            
              <div className="contentBox" key={p._id}>
                <div className="imagediv">
                  <img className="image2" src={p?.photo?.url ? p?.photo?.url : "https://bitsofco.de/content/images/2018/12/broken-1.png"} alt="not found" />
                </div>
                <div className="content">

                  <h2>{p.title}</h2>
                  <p >{p.description.substring(0,150)}...</p>
                  <div className="date">
                    <span className="postDate">{new Date(p.createdAt).toDateString()}</span>
                  </div>

                  <Link to={`/post/${p._id}`}><button className="readMore">Read More...</button></Link>

                </div>
              </div>

          ))
            :
            <>
              <h1 className="notfound">NO BLOG FOUND</h1>

            </>


        }
      </div>

    </div>
  )
}
