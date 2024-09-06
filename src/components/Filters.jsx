import { useState } from "react"
import { useDispatch } from "react-redux"
import { getPosts } from "../store/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";


function Filters() {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({
        search: '',
        tags: ''
    })
    const [chips, setChips] = useState([])
    const navigate = useNavigate()



    const handleChange = (e) => {
        const { name, value } = e.target
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const handleAddChips = (e) => {
        if (e.target.value === ' ' || e.target.value === '') {
            setFilters({ ...filters, tags: '' })
            setChips([...chips])
        } else {
            if (e.code === 'Space' || e.code === 'Enter') {
                setChips([...chips, e.target.value.trim()])
                setFilters({ ...filters, tags: '' })
            }
        }
    }

    const removeChip = (chipIndex) => {
        const tempChips = chips.filter((chip, index) => index !== chipIndex)
        setChips(tempChips)
    }
    const handleFilterPosts = (e) => {
        e.preventDefault()
        dispatch(getPosts({ search: filters.search, tags: chips.join(",") }))
        navigate(`/?search=${filters.search}&tags=${chips.join(",")}`)
    }

    return (
        <div className='filters mb-5 p-4 rounded-lg shadow-md border'>
            <form className='flex flex-col gap-4' onSubmit={handleFilterPosts}>
                <h1 className='text-2xl text-center font-bold mb-2'>Filters</h1>
                <label name="Search">
                    <input
                        className="w-full"
                        type="text"
                        name='search'
                        value={filters.search}
                        onChange={handleChange}
                    />
                </label>
                <label name="Tags" className="border rounded-lg p-2 flex items-center gap-2">
                    {
                        chips &&
                        <div className="chips flex items-center gap-1">
                            {
                                chips.map((chip, index) =>
                                    <div key={index} className="chip p-0.5 px-2 rounded-full flex items-center gap-2 border w-fit">
                                        <span>{chip}</span>
                                        <Icon onClick={() => removeChip(index)} icon='heroicons:x-mark-16-solid' className="hover:text-sky-400 cursor-pointer" />
                                    </div>
                                )
                            }
                        </div>
                    }
                    <input
                        className="w-full border-none p-0"
                        type="text"
                        name='tags'
                        value={filters.tags}
                        onChange={handleChange}
                        onKeyDown={handleAddChips}
                    />
                </label>
                <button className='primary-btn'>Search</button>
            </form>
        </div>
    )
}

export default Filters