import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import 'react-toastify/dist/ReactToastify.css'
import Profile from './pages/Profile'
import AdminLogin from './Admin/AdminLogin'
import AdminHome from './Admin/AdminHome'
import EditUser from './Admin/EditUser'
import AddUser from './Admin/AddUser'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/register' element={<Register/> } />
        <Route exact path='/login' element={<Login/> } />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/profile' element={<Profile/> } />
        <Route exact path="/adminlogin" element={<AdminLogin />} />
        <Route exact path="/admin" element={<AdminHome />} />
        <Route exact path = "/adminedituser" element={<EditUser/>}/>
        <Route exact path = "/adminadduser" element={<AddUser/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App