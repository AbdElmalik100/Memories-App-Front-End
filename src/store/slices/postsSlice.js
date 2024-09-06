import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'sonner'



export const getPosts = createAsyncThunk('postsSlice/getPosts', async ({ search, tags, page }) => {
    const response = await axios.get(`api/posts?search=${search || ''}&tags=${tags || ''}&page=${page}`)
    return response.data
})



export const createPost = createAsyncThunk('postsSlice/createPost', async ({ post, uploading }, { rejectWithValue }) => {
    try {
        const formData = new FormData()
        for (let key in post) formData.append(key, post[key])

        const response = await axios.post('api/posts', formData, { onUploadProgress: progress => uploading(progress) })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updatePost = createAsyncThunk('postSlice/updatePost', async ({ post, uploading}, { rejectWithValue }) => {
    try {
        const formData = new FormData()
        for (let key in post) key === 'selected_file' ? formData.append(key, post[key]) : formData.append(key, JSON.stringify(post[key]))
        const response = await axios.patch(`api/posts/${post._id}`, formData, { onUploadProgress: progress => uploading(progress) })
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deletePost = createAsyncThunk('postSlice/deletePost', async ({ post, setShow }) => {
    try {
        const response = await axios.delete(`api/posts/${post._id}`)
        setShow(false)
        return response.data
    } catch (error) {
        return error
    }
})


export const likePost = createAsyncThunk('postSlice/likePost', async (post, { rejectWithValue }) => {
    try {
        const response = await axios.post(`api/posts/like-post/${post._id}`)
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})


export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: {},
        loading: {
            get: false,
            form: false,
            delete: false
        },
        uploading: false,
        errors: {}
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loading.get = true;
                state.errors = {};
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading.get = false;
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading.get = false;
                state.errors = action.error;
            });

        builder
            .addCase(createPost.pending, state => {
                state.loading.form = true
                state.errors = {}
            }).addCase(createPost.fulfilled, (state, action) => {
                state.loading.form = false
                state.posts.data = [...state.posts.data, action.payload]
                toast.success("Post updated successfuly!")
            }).addCase(createPost.rejected, (state, action) => {
                state.loading.form = false
                state.errors = action.payload
                toast.error("Please fill up required fields")
            })

        builder
            .addCase(updatePost.pending, state => {
                state.loading.form = true
                state.errors = {}
            }).addCase(updatePost.fulfilled, (state, action) => {
                state.loading.form = false                
                state.posts.data = state.posts.data.map(post => post._id === action.payload._id ? action.payload : post)
                toast.success("Post updated successfuly!")
            }).addCase(updatePost.rejected, (state, action) => {
                state.loading.form = false
                state.errors = action.payload
                toast.error("Please fill up required fields")
            })

        builder
            .addCase(deletePost.pending, state => {
                state.loading.delete = true
                state.errors = {}
            }).addCase(deletePost.fulfilled, (state, action) => {
                state.loading.delete = false                
                state.posts.data = state.posts.data.filter(post => post._id !== action.payload._id)
                toast.success("Post deleted successfuly!")
            }).addCase(deletePost.rejected, (state, action) => {
                state.loading.delete = false
                state.errors = action.payload
                toast.error("Something went wrong!")
            })
        builder
            .addCase(likePost.pending, state => {
                state.errors = {}
            }).addCase(likePost.fulfilled, (state, action) => {                
                state.posts.data = state.posts.data.map(post => post._id === action.payload._id ? action.payload : post)
            }).addCase(likePost.rejected, (state, action) => {
                state.errors = action.payload
            })
    }
})

// Action creators are generated for each case reducer function


export default postsSlice.reducer