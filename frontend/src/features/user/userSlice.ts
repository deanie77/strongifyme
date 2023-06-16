import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

type User = {
    username: string
    token: string
    height: Number
    weight: Number
    bmi: Number
}

type InitialState = {
    loading: boolean
    user: User
    error: string
}

const initialState: InitialState = {
    loading: false,
    user: {
        username: '',
        token: '',
        height: 0,
        weight: 0,
        bmi: 0
    },
    error: ''
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.data)
})

export const loginUser = createAsyncThunk('user/login', async (initialState: any) => {
    try {
        const response = await axios.post('http://localhost:8000/api/users/login', initialState)
        return response.data
    } catch (error: any) {
        return error.message
    }
})

export const registerUser = createAsyncThunk('user/register', async (initialState: any) => {
    try {
        const response = await axios.post('http://localhost:8000/api/users/register', initialState)
        return response.data
    } catch (error: any) {
        return error.message
    }
})

export const userBMI = createAsyncThunk('user/bmi', async (initialState: any) => {
    try {
       const response = await axios.patch('http://localhost:8000/api/users/measure/bmi', initialState) 
       return response.data
    } catch (error: any) {
        return error.message
    }
})

const userSlice = createSlice({
    name: 'user',
    reducers: {},
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.user = {username: '', token: '', height: 0, weight: 0, bmi: 0}
            state.error = action.error.message || 'Something went wrong'
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(userBMI.fulfilled, (state, action) => {
            state.loading = false
            state.user.bmi = action.payload.result.bmi
        })
    }
})

export default userSlice.reducer