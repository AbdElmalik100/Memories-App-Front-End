import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getPosts } from '../store/slices/postsSlice';
import Post from '../components/Post';
import emptyPosts from '../assets/images/photos.png'; // Adjust the path as needed
import { AnimatePresence } from 'framer-motion';
import PostForm from '../components/PostForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Filters from '../components/Filters';
import PostsPagination from '../components/PostsPagination';

function Home() {
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.posts)
    const [selectedPost, setSelectedPost] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(+searchParams.get("page") || 1)


    useEffect(() => {
        dispatch(getPosts({ search: searchParams.get("search"), tags: searchParams.get("tags"), page: page }))
    }, [searchParams])

    return (
        <div className='home-page min-h-screen'>
            <div className='app-content py-12'>
                <div className={`container px-4 lg:w-[1200px] w-full flex gap-8 lg:flex-row flex-col-reverse items-stretch`}>
                    {
                        posts.data &&
                        <div className={`left-side gap-5 w-full grid md:grid-cols-2 grid-cols-1 md:col-span-2 col-span-1 grow ${!posts.data.length ? 'content-stretch' : 'content-start'}`}>
                            {
                                !posts.data.length
                                    ?
                                    <div className='empty grid place-items-center col-span-2 h-full'>
                                        <div className='text-neutral-400 text-center'>
                                            <img src={emptyPosts} className='w-48 mx-auto mb-3' alt="Memories empty photo" />
                                            <span className='text-lg block mb-2'>No posts to show yet.</span>
                                            <p>Create a new post to share it with your friends.</p>
                                        </div>
                                    </div>
                                    :
                                    <AnimatePresence>
                                        {
                                            posts.data.map(post => (
                                                <Post key={post._id} post={post} setSelectedPost={setSelectedPost} />
                                            ))
                                        }
                                    </AnimatePresence>
                            }
                        </div>
                    }
                    <div className="right-side lg:max-w-sm w-full">
                        <Filters searchParams={searchParams}></Filters>
                        <PostForm selectedPost={selectedPost} setSelectedPost={setSelectedPost}></PostForm>
                        <PostsPagination page={page} setPage={setPage}></PostsPagination>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home