import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { createPost, updatePost } from "../store/slices/postsSlice"
import formatBytes from "../utils/formatBytes"


function PostForm({ selectedPost, setSelectedPost }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    const [post, setPost] = useState({
        title: '',
        message: '',
        tags: '',
        selected_file: '',
    })
    const [selected, setSelected] = useState(null)
    // const [selectedPost, setSelectedPost] = useState(null)
    const { loading, errors } = useSelector(state => state.posts)

    const handleChange = (e) => {
        const { name, value } = e.target
        setPost({
            ...post,
            [name]: value,
            creator: user._id
        })
    }

    const handleFile = (e) => {
        const file = e.target.files[0]
        const fileUrl = URL.createObjectURL(file)
        setPost(prevState => ({ ...prevState, selected_file: file }))
        setSelected({
            file,
            fileUrl
        })
    }

    const clear = () => {
        setPost({
            title: '',
            message: '',
            tags: '',
            selected_file: '',
        })
        setSelected(null)
        setSelectedPost(null)
    }

    const uploadingProgress = progress => {
        const progressValue = Math.round((progress.loaded * 100) / progress.total)
        document.querySelector('.progress-bar').style.width = `${progressValue}%`
        document.querySelector('.progress-percentage').textContent = `${formatBytes(progress.loaded)}/${formatBytes(progress.total)}`
        if (progress.loaded === progress.total) clear()
    }

    const addPost = async () => {
        if (selected) {
            dispatch(createPost({
                post,
                uploading: uploadingProgress
            }))
        } else {
            dispatch(createPost({ post, uploading: progress => progress }))
                .then(() => {
                    clear()
                })
        }
    }

    const editPost = (post) => {
        if (selected) {
            dispatch(updatePost({
                post,
                uploading: uploadingProgress,
            }))
        } else {
            dispatch(updatePost({ post, uploading: progress => progress }))
                .then(() => {
                    clear()
                })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedPost) {
            editPost(post)
        } else addPost()
    }


    useEffect(() => {
        if (selectedPost !== null) setPost(selectedPost)
    }, [selectedPost])

    return (
        <>
            {
                !user
                    ?
                    <div className='p-8 px-6 rounded-lg bg-white border text-center shadow-md'>
                        <div className='mx-auto w-14 h-14 mb-3 rounded-full bg-rose-50 grid place-items-center'>
                            <Icon icon='mingcute:lock-fill' fontSize={24} className='text-rose-700' />
                        </div>
                        <h2 className='text-lg'>
                            Please login to continue in memories app and make posts as much as you can.
                        </h2>
                        <Link className='primary-btn w-fit mx-auto mt-4' to="/login">
                            Get started
                        </Link>
                    </div>
                    :
                    <form className='flex flex-col gap-3 p-8 px-5 rounded-lg border shadow-md' onSubmit={handleSubmit}>
                        <h1 className='text-2xl text-center font-bold mb-5'>Create a post</h1>
                        <label name="Title">
                            <input
                                className={`w-full ${errors.title && 'border-rose-500'}`}
                                type="text"
                                name='title'
                                value={post.title}
                                onChange={handleChange}
                                disabled={loading.form}
                            />
                            {
                                errors.title && <span className="italic text-rose-500 block mt-1 ms-2">{errors.title.msg}</span>
                            }
                        </label>
                        <label name="Message">
                            <textarea
                                className={`w-full resize-none ${errors.message && 'border-rose-500'}`}
                                name="message"
                                rows={10}
                                value={post.message}
                                onChange={handleChange}
                                disabled={loading.form}
                            >
                            </textarea>
                            {
                                errors.message && <span className='italic text-rose-500 block mt-1 ms-2'>{errors.message.msg}</span>
                            }
                        </label>
                        <label name="Tag (comma separator)">
                            <input
                                className={`w-full ${errors.tags && 'border-rose-500'}`}
                                type="text"
                                name='tags'
                                value={post.tags}
                                onChange={handleChange}
                                disabled={loading.form}
                            />
                            {
                                errors.tags && <span className='italic text-rose-500 block mt-1 ms-2'>{errors.tags.msg}</span>
                            }
                        </label>
                        {
                            selected
                                ?
                                <div className='selected-file bg-neutral-50 rounded-lg p-3'>
                                    <div className='flex items-center justify-between gap-3'>
                                        <div className='image-info flex items-center gap-2 w-3/4'>
                                            <div className='min-w-12 max-w-12 h-12 overflow-hidden rounded-lg'>
                                                <img src={selected.fileUrl} className='rounded-lg shadow-md object-cover w-full h-full' alt={selected.file.name} />
                                            </div>
                                            <div className='overflow-hidden'>
                                                <h3 className='truncate'>{selected.file.name}</h3>
                                                <span className='progress-percentage text-xs text-neutral-600'>
                                                    {formatBytes(selected.file.size)}
                                                </span>
                                            </div>
                                        </div>
                                        <Icon
                                            icon={loading.form ? "gravity-ui:arrows-rotate-right" : 'gravity-ui:trash-bin'}
                                            onClick={() => setSelected(null)}
                                            fontSize={18}
                                            className={`cursor-pointer transition ease-in-out hover:text-rose-500 text-rose-600 ${loading.form ? 'pointer-events-none animate-spin text-sky-400' : ''}`}
                                        />
                                    </div>
                                    <div className="progess w-full h-1.5 rounded-full transition ease-in relative overflow-hidden bg-neutral-200 mt-4">
                                        <span className='progress-bar block bg-sky-400 w-0 transition-all ease-in-out absolute left-0 top-0 h-full rounded-full'></span>
                                    </div>
                                </div>
                                :
                                <label className="file-input p-4 py-10 border border-dashed rounded-lg cursor-pointer grid place-items-center">
                                    <input type="file" accept='image/*' name='selected_file' className='hidden' onChange={handleFile} />
                                    <div className='flex flex-col gap-2 items-center justify-center'>
                                        <Icon icon="ep:upload-filled" className='mx-auto' fontSize={30} />
                                        <h3 className='text-black text-center'>
                                            <img src={post.selected_file} alt="" />
                                            Drop your memory image here, or <span className='browse hover:underline transition text-sky-500'>Browse</span>
                                        </h3>
                                        <span className='text-xs font-light text-neutral-400'>Accepts only images (PNG, JPG, JPEG)</span>
                                    </div>
                                </label>
                        }
                        <button className={`primary-btn mt-5 ${loading.form ? 'opacity-50 hover:bg-sky-500' : ''}`}
                            disabled={loading.form}>
                            {
                                loading.form
                                    ?
                                    <div className='flex items-center gap-2'>
                                        <Icon icon="gravity-ui:arrows-rotate-right" className='animate-spin' fontSize={20} />
                                        <span>Loading...</span>
                                    </div>
                                    :
                                    <span>
                                        {selectedPost ? "Apply Changes" : 'Submit'}
                                    </span>
                            }
                        </button>
                    </form>
            }
        </>
    )
}

export default PostForm