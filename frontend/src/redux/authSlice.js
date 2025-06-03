import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user");   //chatgpt line


const authSlice = createSlice({
    name :"auth",
    initialState : {
        loading : false,
        // user :null
        user: userFromStorage ? JSON.parse(userFromStorage) : null,   //chatgpt line
        
    },
    reducers : {
        // actions
        setLoading : (state, action) => {
            state.loading = action.payload;
        },
        setUser : (state, action) => {
            state.user = action.payload;
        }
    }
});
export const {setLoading, setUser} = authSlice.actions;
export default authSlice.reducer;