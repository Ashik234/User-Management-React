import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { changeUserDetails } from '../Redux/User/UserSlice'

function Login() {
  const navigate = useNavigate()
  const dispath = useDispatch()

  const [values, setValues] = useState({
    email: "",
    password:""
  })

  const generateError = (err) => 
    toast.error(err, {
      position:"bottom-right"
    })

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:4000/login", {
        ...values
      }, {
        withCredentials:true
      })      
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors
          if (email) generateError(email);
          else if (password) generateError (password)
        } else {
          navigate("/")
          dispath(
            changeUserDetails({
              name: data.user.email,
              userId: data.user._id,
              image: data.user?.image
            }))
        }
      }
    } catch (err) {
      console.log(err);
    }
 }
  return (
    <div className='container'>
      <h2>Login Account</h2>
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
        <span>
        Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login