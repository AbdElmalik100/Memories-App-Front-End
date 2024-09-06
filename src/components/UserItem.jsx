import { Icon } from "@iconify/react/dist/iconify.js"
import { useClickAway } from "@uidotdev/usehooks"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/slices/usersSlice"

function UserItem() {
    const user = useSelector(state => state.users.user)
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)

    const userMenu = useClickAway(() => {
        setShowMenu(false)
    })
    
    const userLogout = () => {
        dispatch(logout())
    }


    return (
        <div ref={userMenu} className="user-item relative">
            <div className="avatar" onClick={() => setShowMenu(val => !val)}>
                <img className="rounded-full min-w-10 h-10 cursor-pointer border border-transparent transition-all ease-in-out hover:border-sky-500" src={`${user.avatar ? user.avatar : `https:placehold.co/100X100?text=?`}`} alt={`${user.first_name} Avatar`} />
            </div>
            <div className={`user-menu overflow-hidden absolute border right-0 top-12 p-1 rounded-lg bg-white shadow-md flex flex-col gap-1 w-[225px] transition-all ease-in-out z-20 ${showMenu ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'}`}>
                <div className="user-info transition-all ease-in-out hover:bg-neutral-50 rounded-md p-2 mb-2 pb-2 flex items-center gap-2">
                    <img className="rounded-full min-w-10 h-10" src={`${user.avatar ? user.avatar : `https:placehold.co/100X100?text=?`}`} alt={`${user.first_name} Avatar`} />
                    <div className="overflow-hidden truncate">
                        <span className="capitalize truncate">{user.first_name}</span>
                        <span className="block truncate text-neutral-500 font-light">{ user.email }</span>
                    </div>
                </div>
                <button className="p-1.5 px-3 justify-start rounded-md transition-all ease-in-out hover:bg-neutral-100 flex items-center gap-2 w-full">
                    <Icon icon="iconamoon:profile-fill" fontSize={18} />
                    Profile
                </button>
                <button className="p-1.5 px-3 rounded-md transition-all ease-in-out hover:bg-rose-50 flex items-center gap-2 w-full justify-start text-rose-600" onClick={userLogout}>
                    <Icon icon="hugeicons:logout-square-01" fontSize={18} />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default UserItem