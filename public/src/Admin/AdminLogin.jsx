import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const navigate = useNavigate()

    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    
    const errorGenerator = (err) => toast.error(err, { position: 'bottom-right' })
    
    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:4000/adminlogin", { ...values }, { withCredentials: true }
        )
      if (data.message) {
        errorGenerator(data.message)
      } else {
          localStorage.setItem("admin",data.token)
        navigate("/admin")
      }
    } catch (error) {
      // errorGenerator(data.message)
    }

  }

  return (
    <div className='container'>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' placeholder='Email' onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' placeholder='Password' onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })} />
        </div>
        <button type='submit'>Login</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default AdminLogin