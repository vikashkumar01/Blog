
import './App.css';
import Navbar from './component/NavBar/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from './component/Home/Home'
import {About} from './component/About/About'
import {Write} from './component/Write/Write'
import {Profile} from './component/Profile/Profile'
import {Register} from './component/Register/Register'
import {Login} from './component/Login/Login'
import {Post} from './component/singlePost/Post'
import {Upost} from './component/Updatepost/Upost'
import {Rpost} from './component/singlePost/Rpost'
import {Uprofile} from './component/update/Uprofile'
import {Upassword} from './component/update/Upassword'
import {useContext} from 'react'
import {Context} from './component/context/Context'

function App() {

  const {user} = useContext(Context)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
       <Route exact path="/" element={<Home />} />
       <Route exact path="/about" element={ <About />} />
       <Route exact path="/write" element={user? <Write />: <Login/>} />
       <Route exact path="/profile" element={user? <Profile />: <Login/>} />
       <Route exact path="/login" element={user? <Home />: <Login/>} />
       <Route exact path="/register" element={user? <Home />: <Register/>} />
       <Route exact path="/post/:postId" element={user?<Post/>:<Rpost/>} />
       <Route exact path="/upost/:postId" element={user && <Upost/>} />
       <Route exact path="/uprofile/:usertId" element={user && <Uprofile/>} />
       <Route exact path="/upassword/:userId" element={user && <Upassword/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
