import React from 'react';
import Home from './Home';
import { useState } from 'react'
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { changeUserDetails } from '../Redux/User/UserSlice'

function Profile() {
    const { name, userId, image } = useSelector(state => state.user)
    const [image1, setImage] = useState("")
    const dispatch = useDispatch()
    const uploadImage = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image1)
        formData.append("userId", userId)

        const config = {
            header: {
                "content-type": "multipart/form-data",
                userId: userId
            },
            withCredentials: true
        }

        try {
            const { data } = await axios.post("http://localhost:4000/profile", formData, config)
            dispatch(
                changeUserDetails({
                    image: data.user.image,
                    name:data.user.name, 
                    userId:data.user._id
                }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Home />
            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center', justifyContent: 'center', minHeight: '80vh',backgroundColor: 'tan',}}>
                <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center', backgroundColor: 'white', borderRadius: '15px', padding: '20px',}}>
                    <img
                       src={image ?  `/images/${image}`  : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"  }
                        className="img-fluid"
                        alt="Profile"
                        style={{width: '180px',borderRadius: '10px',marginBottom: '20px',}}
                    />
                    <p style={{ color: '#2b2a2a', marginBottom: '20px' }}>{name}</p>
                    <form action="">
                        <div style={{backgroundColor: '#efefef',borderRadius: '5px',padding: '10px',marginBottom: '10px',}}>
                            <input
                                type="file"
                                style={{ width: '180px', height: '50px' }}
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                type="button"
                                className="btn btn-outline-primary me-1"
                                style={{ width: '150px' }}
                                onClick={uploadImage}
                            >Update Image</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Profile;










