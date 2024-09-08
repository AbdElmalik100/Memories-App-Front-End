import { Icon } from "@iconify/react/dist/iconify.js"
import moment from "moment"
import DeletePopup from "./DeletePopup"
import { useState } from "react"
import { likePost } from "../store/slices/postsSlice"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"

function Post(props) {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ ease: "easeInOut" }}
        >

            <div className="post-card rounded-lg bg-neutral-50 shadow-md overflow-hidden h-full flex flex-col">
                <div className='image relative h-[250px] before:absolute before:w-full before:h-full before:bg-black/30'>
                    <img className='object-cover h-full w-full' src={props.post.selected_file ? `${import.meta.env.VITE_UPLOADS}${props.post.selected_file}` : 'https://placehold.co/100X100?text=?'} alt="" />
                    <div className='author absolute text-white top-3 left-5'>
                        <h3 className='text-lg capitalize'>{props.post.creator.first_name}</h3>
                        <span className='text-xs'>{moment(props.post.created_at).fromNow()}</span>
                    </div>
                    {
                        (user && user._id === props.post.creator._id) &&
                        <button className='w-8 h-8 grid place-items-center rounded-lg border absolute text-white right-5 top-3 transition ease-in-out hover:bg-neutral-400 hover:border-neutral-400'>
                            <Icon icon='zondicons:dots-horizontal-triple' className='text-white' fontSize={20} onClick={() => props.setSelectedPost(props.post)} />
                        </button>
                    }
                </div>
                <div className='info p-5 grow flex flex-col'>
                    {
                        props.post.tags &&
                        <div className='text-neutral-500 font-light flex gap-2 mb-3'>
                            {
                                props.post.tags.map((tag, index) => (
                                    <span key={index}>
                                        #{tag}
                                    </span>
                                ))
                            }
                        </div>
                    }
                    <h2 className='text-2xl font-bold mb-2 capitalize'>
                        {props.post.title}
                    </h2>
                    <p className='message text-gray-500 capitalize mb-5'>
                        {props.post.message}
                    </p>
                    <div className='actions flex items-center justify-between mt-auto'>
                        <button className={`likes text-sky-600 flex items-center gap-1 p-1.5 px-4 rounded-lg transition ease-in-out ${!user ? 'hover:bg-none opacity-25' : 'hover:bg-sky-600 hover:text-white'}`}
                            disabled={!user}
                            onClick={() => dispatch(likePost({post: props.post, user}))}>
                            <Icon icon={(props.post.likes.includes(user?._id)) ? 'solar:like-bold' : 'solar:like-broken'} fontSize={20} className='' />
                            <span>Like {props.post.likes.length}</span>
                        </button>
                        {
                            (user && user._id === props.post.creator._id) &&
                            <button className='likes text-rose-600 flex items-center gap-1 p-1.5 px-4 rounded-lg transition ease-in-out hover:bg-rose-600 hover:text-white'
                                onClick={() => setShow(true)}>
                                <Icon icon='gravity-ui:trash-bin' fontSize={20} className='' />
                                <span>Delete</span>
                            </button>
                        }
                    </div>
                </div>
                <DeletePopup show={show} setShow={setShow} post={props.post} />
            </div>
        </motion.div>
    )
}

export default Post