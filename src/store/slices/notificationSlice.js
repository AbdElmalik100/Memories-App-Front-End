import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getNotifications = createAsyncThunk('notificationSlice/getNotifications', async () => {
    const response = await axios.get(`api/notifications`)
    return response.data
})


export const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState: {
        notifications: [],
        loading: false
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getNotifications.pending, state => {
                state.loading = true
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false
                state.notifications = action.payload
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = false
                console.log(action);
            })
    }
})

export default notificationSlice.reducer