import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../store/slices/postsSlice";

function PostsPagination({ page, setPage }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pages } = useSelector(state => state.posts.posts)

    const handlePageChange = (nextPage) => {
        setPage(nextPage)
        dispatch(getPosts({ page: nextPage }))
        navigate(`/?page=${nextPage}`)
    }
    return (
        <>
            {
                pages &&
                <div className='pagination mt-5 p-4 rounded-lg shadow-md border mx-auto grid place-items-center'>
                    <Pagination total={pages} page={page} onChange={handlePageChange} initialPage={1} />
                </div>
            }
        </>

    )
}

export default PostsPagination