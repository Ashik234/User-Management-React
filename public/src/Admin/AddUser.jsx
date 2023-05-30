import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

function AddUser() {
  const navigate = useNavigate()
  const [value, setValue] = useState({
    eamil: "",
    password: ""
  })
  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right"
    })
  }

  const addUser = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:4000/adminadduser", { ...value }, { withCredentials: true })
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors
          if (email) generateError(email)
          else if (password) generateError(password)
        } else {
          navigate("/admin")
        }
      }
    } catch (error) {

    }
  }
  return (
    <>
      <div className='bodys'>
        <div className='container_add'>
          <h2 className='h2'>Add user</h2>
          <form className='form' onSubmit={addUser}>
            <div>
              <label className='label' htmlFor="email">Email</label>
              <input className='input' type="email" name='email' placeholder='Email' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
            </div>
            <div>
              <label className='label' htmlFor="password">Password</label>
              <input className='input' type='password' name='password' placeholder='Password' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
            </div>
            <button className='button' type='submit'>Add User</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default AddUser