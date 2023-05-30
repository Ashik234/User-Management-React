import { createSlice } from"@reduxjs/toolkit";

export const AdminSlice = createSlice({
    name:"admin",
    initialState: {
        id:"",
        email:""
    },
    reducers: {
        setUserId: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
        }
    }
})

export const  { setUserId } = AdminSlice.actions
export default AdminSlice.reducer