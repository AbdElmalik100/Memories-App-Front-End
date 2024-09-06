import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";


export const me = createAsyncThunk('usersSlice/me', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('api/users/me')
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const signin = createAsyncThunk('usersSlice/login', async ({ userData, navigate }, { rejectWithValue }) => {
    try {
        const response = await axios.post('api/users/login', userData)
        navigate("/")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const signup = createAsyncThunk('usersSlice/signup', async ({userForm, navigate}, {rejectWithValue}) => {
    try {
        const response = await axios.post('api/users/register', userForm)
        navigate("/")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const googleAuth = createAsyncThunk('usersSlice/googleAuth', async ({ access_token, credentials, navigate }) => {
    const response = await axios.post('api/users/googleOAuth', { access_token, credentials })
    navigate("/")
    return response.data
})


export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        loading: false,
        errors: {}
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("UTK")
            axios.defaults.headers.Authorization = ''
            state.user = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signin.pending, state => {
                state.loading = true
                state.errors = {}
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                localStorage.setItem("UTK", action.payload.token)
                axios.defaults.headers.Authorization = `Bearer ${action.payload.token}`
            })
            .addCase(signin.rejected, (state, action) => {
                state.loading = false
                if (action.payload.invalid_credentials) {
                    toast.error(action.payload.invalid_credentials)
                } else state.errors = action.payload
            })

        builder
            .addCase(signup.pending, state => {
                state.loading = true
                state.errors = {}
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                localStorage.setItem("UTK", action.payload.token)
                axios.defaults.headers.Authorization = `Bearer ${action.payload.token}`
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                if (action.payload.code === 11000) {
                    toast.error("This email is already taken")
                }
                state.errors = action.payload
            })

        builder
            .addCase(googleAuth.pending, state => {
                state.errors = {}
            })
            .addCase(googleAuth.fulfilled, (state, action) => {
                state.user = action.payload.user
                localStorage.setItem("UTK", action.payload.token)
                axios.defaults.headers.Authorization = `Bearer ${action.payload.token}`
            })
            .addCase(googleAuth.rejected, (state, action) => {
                toast.error("somethin went wrong")
            })

        builder
            .addCase(me.pending, state => {
                state.errors = {}
            })
            .addCase(me.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(me.rejected, (state, action) => {
                state.errors = action.payload
                localStorage.removeItem("UTK")
                axios.defaults.headers = ''
                state.user = null
            })
    }
})

export const { logout } = usersSlice.actions

export default usersSlice.reducer