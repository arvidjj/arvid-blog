import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import './App.css'
import Index from './components/Index'
import Header from './components/Header'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import NewPost from './components/NewPost'
import ViewPost from './components/ViewPost'
import NotFound from './components/404'
import NewPostCK from './components/NewPostCK'
import { useAuth } from './hooks/AuthProvider';

function App() {
  const { value } = useAuth();

  return (
    <>
      <Header />

      <div className="App">
        <Routes>
          <Route path='*' element={<NotFound />} />

          <Route path="/" element={<Index />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="post/:postId" element={<ViewPost />} />

          {(value.isAuthenticated && (value.userRole === 'admin')) && (
            <>
              <Route path="/newpost" element={<NewPost />} />
              <Route path="/newpostck" element={<NewPostCK />} />
            </>
          )}

        </Routes>
      </div>

      <footer className='footer'>
        <p>&copy; 2024 Arvid. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App;
