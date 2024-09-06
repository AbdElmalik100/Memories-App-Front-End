import { useClickAway } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../store/slices/postsSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

function DeletePopup({ show, setShow, post }) {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.posts)

    const ref = useClickAway(() => {
        setShow(false)
    })

    const deletingPost = async () => {
        dispatch(deletePost({ post, setShow }))
    }


    return (
        <div className={`overlay ${show ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div ref={ref} className={`delete-pop md:w-[500px] w-[calc(100%-30px)] p-6 bg-white shadow-md rounded-lg text-sm transition-all ease-in-out ${show ? 'scale-100' : 'scale-0'}`}>
                <h2 className="text-xl">
                    Are you sure you want to delete <span className="text-sky-500">"{post.title}"</span> post?
                </h2>
                <p className="text-neutral-500 mt-3 font-light">
                    By deleting this post you can't recover it again, it will be deleted permanently.
                </p>
                <div className="actions flex items-center gap-2 mt-6 justify-end">
                    <button
                        className={`p-1.5 px-4 border rounded-lg transition-all ease-in-out hover:bg-neutral-100 ${loading.delete ? 'bg-neutral-100' : ''}`}
                        disabled={loading.delete}
                        onClick={() => setShow(false)}
                    >
                        Close
                    </button>
                    <button
                        className={`p-1.5 px-4 border rounded-lg text-white transition-all ease-in-out bg-rose-600 hover:bg-rose-500 ${loading.delete ? 'hover:bg-rose-600 opacity-85' : ''}`}
                        onClick={deletingPost}
                        disabled={loading.delete}
                    >
                        {loading.delete ? <Icon icon='ei:spinner' fontSize={20} className="animate-spin" /> : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletePopup