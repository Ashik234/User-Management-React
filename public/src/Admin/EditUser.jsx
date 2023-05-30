import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { setUserId } from '../Redux/Admin/AdminSlice'

function EditUser() {
  const {id,email} = useSelector((state)=>state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const editUser = async (e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.post("http://localhost:4000/edituser",
            {id,email},{withCredentials:true})
            if(data){
                navigate("/admin")
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <div className='bodys'>
        <div className='container_add'>
            <h2 className='h2'>Edit User</h2>
            <form className='form' onSubmit={editUser}>
                <div>
                    <label className='label' htmlFor="email">Email</label>
                    <input className='input'
                        type="email"
                        name='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => dispatch(setUserId({ email: e.target.value, id:id }))}
                    />
                </div>
                <button className='button' type='submit'>Save</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default EditUser