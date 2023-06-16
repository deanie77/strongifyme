import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

type Question = {
    authorId: string
    question: string
    options: Array<Object>
}

type InitialState = {
    loading: boolean
    questions: Array<Question>
    error: string
}

const initialState: InitialState = {
    loading: false,
    questions: [],
    error: ''
}

export const fetchQuestions = createAsyncThunk('/fetch/health/questions', async () => {
    return axios
            .get('http://localhost:8000/api/users/health/questions')
            .then((response) => response.data)
            .catch(error => error.message)
})

const questionSlice = createSlice({
    name: 'question',
    reducers: {},
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<Array<Question>>) => {
            state.loading = false
            state.questions = action.payload
            state.error = ''
        })
        builder.addCase(fetchQuestions.rejected, (state, action) => {
            state.loading = false
            state.questions = []
            state.error = action.error.message || 'Something went wrong!'
        })
    }
})

export default questionSlice.reducer