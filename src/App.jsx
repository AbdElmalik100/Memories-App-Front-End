import { RouterProvider } from "react-router-dom";
import router from './routers/index.jsx'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { me } from "./store/slices/usersSlice.js";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(me())
    }, [])
    return (
        <RouterProvider router={router()} />
    )
}

export default App
