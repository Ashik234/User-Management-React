import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { changeUserDetails } from '../Redux/User/UserSlice'

export default function Home() {
  const navigate = useNavigate()
  const [cookies, removeCookie] = useCookies([])
  const dispatch = useDispatch()
  
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login")
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        )
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login")
        } else toast(`HI ${data.user}`, { theme: 'dark' })
      }
    }
    verifyUser()
  },[cookies,navigate,removeCookie])
  const logOut = () => {
    removeCookie("jwt");
    dispatch(changeUserDetails({
      
    }))
    navigate("/login")
  }
  return (
      <>
     <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        <h1>Home</h1>
        <button
          onClick={() => navigate('/profile')}
          style={{
            marginLeft: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Profile
        </button>
        <button
          onClick={logOut}
          style={{
            marginLeft: '10px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Log Out
        </button>
      </div>
      <ToastContainer/>
      </>
  )
}