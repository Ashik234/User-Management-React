import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { setUserId } from '../Redux/Admin/AdminSlice'

function AdminHome() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [cookies, removeCookie] = useCookies([])
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!localStorage.getItem("admin")) {
        navigate("/adminlogin")
      } else {
        const data = await axios.post("http://localhost:4000/admin",
          {}, { withCredentials: true }).then(res => {
            // if (!res.data.status) {
            //   removeCookie("adminjwt")
            //   navigate("/adminlogin")
            // }
          }).catch(err =>
            console.log(err))
      }
    }

    verifyAdmin()
    axios.get("http://localhost:4000/getallusers").then((response) => {
      setUsers(response.data.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [cookies, navigate, removeCookie])

  const deleteUser = async (id) => {
    console.log(id);
    axios.post(`http://localhost:4000/deleteuser/${id}`, {}, { withCredentials: true }).then((res) => {
      console.log(res);
      if (res.data.deleted) {
        setUsers(users.filter(user => user._id !== id))
      }
    })
  }
  const logOut = () => {
    // removeCookie("admin")
    localStorage.removeItem("admin")
    navigate("/adminlogin")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand" style={{ cursor: "pointer", fontWeight: "bold", fontSize: "24px", textShadow: "3px 3px 4px rgba(0, 0, 0, 0.3)" }}>
          Admin Panel
        </span>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setQuery(e.target.value)} />
          </form>
          <button onClick={() => navigate('/adminadduser')} style={{
            marginTop: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }} type="submit">Add User</button>
          <button onClick={logOut} style={{
            marginLeft: '10px',
            backgroundColor: 'orange',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }} type="submit">Logout</button>
        </div>
      </nav>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "3rem" }}>
        <table class="table" style={{ width: "1000px" }}>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.filter((user) =>
                user.email.toLowerCase().includes(query))
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.email}</td>
                      <td>
                        <button className='btn btn-primary' onClick={() => {
                          dispatch(setUserId({ id: user._id, email: user.email }))
                          navigate("/adminedituser")
                        }}
                          style={{ margin: "5px" }}
                        > Edit</button>
                        <button className="btn btn-danger" style={{ margin: "5px", backgroundColor: "red" }} onClick={() => deleteUser(user._id)}>DELETE</button>
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminHome