import { RouterProvider } from "react-router-dom";
import router from './routers/index.jsx'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { me } from "./store/slices/usersSlice.js";
import { socket } from "./socket.js";
import { toast } from "sonner";
import { getNotifications } from "./store/slices/notificationSlice.js";

function App() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)

    useEffect(() => {    
        if (user) socket.emit("user_register", user._id)
        socket.on('notification', notification => {
            console.log("notification from the server", notification);
            toast.custom(() => (
                <div className="notification rounded-lg md:w-[330px] w-full p-4 border bg-white shadow-md flex items-start gap-2">
                    <img src={notification.post.creator.avatar ? notification.post.creator.avatar : 'https:placehold.co/100X100?text=?'} className="rounded-full w-10 h-10" alt="" />
                    <p>
                        <span className="font-bold capitalize">{notification.post.creator.first_name}</span> added a new post "{notification.post.title}"
                    </p>
                </div>
            ))
        })

        socket.on("like_notification", notification => {
            toast.custom(() => (
                <div className="notification rounded-lg md:w-[330px] w-full p-4 border bg-white shadow-md flex items-start gap-2">
                    <img src={notification.user.avatar ? notification.user.avatar : 'https:placehold.co/100X100?text=?'} className="rounded-full w-10 h-10" alt="" />
                    <p>
                        <span className="font-bold capitalize">{notification.user.first_name}</span> liked your post "{notification.post.title}"
                    </p>
                </div>
            ))
            dispatch(getNotifications())
        })

        return () => {
            // Clean up the event listener on component unmount
            socket.off("notification");
            socket.off("like_notification");
        };
    }, [user, socket])

    useEffect(() => {
        dispatch(getNotifications())
        dispatch(me())
    }, [])
    return (
        <RouterProvider router={router()} />
    )
}

export default App
