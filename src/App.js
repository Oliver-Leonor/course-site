//import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
//import Banner from './components/Banner'
//import Highlights from './components/Highlights';

import Courses from './pages/Courses';
import CourseView from './pages/CourseView';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import { UserProvider } from './UserContext';
import './App.css';


function App() {

  const [user, setUser] =useState({

    // email: localStorage.getItem('email')
    id: null,
    isAdmin: null

  });

  const unsetUser = () => {
    localStorage.clear();
  }

useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res => res.json())
  .then(data => {

      if(typeof data._id !== "undefined") {

        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, [])

  return (

    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
          <AppNavbar />
          <Container>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/courses" element={<Courses/>} />
                <Route path="/courses/:courseId" element={<CourseView/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="*" element={<NotFound/>} />
              </Routes>        
          </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
