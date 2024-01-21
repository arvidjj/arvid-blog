import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import './App.css'
import Index from './components/Index'
import Header from './components/Header'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import NewPost from './components/NewPost'
import ViewPost from './components/ViewPost'

function App() {
  return (
    <>
      <Header />

      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="newpost" element={<NewPost />} />
          <Route path="post/:postId" element={<ViewPost />} />
        </Routes>
      </div>

      <footer className='footer'>
        <p>&copy; 2024 Arvid. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App;
