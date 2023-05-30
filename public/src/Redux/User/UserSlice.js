import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        userId:"",
        name: "",
        image: ""
    },
    reducers: {
        changeUserDetails: (state, action) => {
            state.userId = action.payload.userId
            state.name = action.payload.name
            state.image = action.payload.image
        }
    }
})

export const { changeUserDetails } = UserSlice.actions
export default UserSlice.reducer