import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: (() => {
        const storedData = localStorage.getItem('userInfo');
        try {
            return storedData ? JSON.parse(storedData) : null;
        } catch (error) {
            console.error('Error parsing userInfo from localStorage:', error);
            return null;
        }
    })()
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials:(state, action) => {
            state.userInfo=action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout:(state, action) => {
            state.userInfo=null
            localStorage.removeItem('userInfo')
        }
    }
})

export default authSlice.reducer
export const { setCredentials, logout} = authSlice.actions 