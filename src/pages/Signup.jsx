import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { signup } from "../store/slices/usersSlice"
import { Icon } from "@iconify/react/dist/iconify.js"


function Signup() {
    const [userForm, setUserForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    })
    const { loading, errors } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserForm({
            ...userForm,
            [name]: value
        })
    }

    const createAccount = (e) => {
        e.preventDefault()
        dispatch(signup({ userForm, navigate }))
    }


    return (
        <div className='signup-page'>
            <div className="container px-4 min-h-screen grid place-items-center">
                <div className='login-box p-10 px-8 border rounded-lg shadow-md md:w-[450px] w-full mx-auto'>
                    <h1 className='text-center text-xl capitalize font-bold'>Create an account</h1>
                    <form className='mt-5 flex flex-col gap-5' onSubmit={createAccount}>
                        <div className="flex gap-2">
                            <label>
                                <span className='block text-black mb-1'>
                                    First Name
                                    <span className="required">*</span>
                                </span>
                                <input className={`w-full ${errors.first_name && 'border-rose-600'}`} type="text" name='first_name' placeholder='John' value={userForm.first_name} onChange={handleChange} />
                                {
                                    errors.first_name && <span className="text-rose-600 italic block mt-1">{errors.first_name.msg}</span>
                                }
                            </label>
                            <label>
                                <span className='block text-black mb-1'>
                                    Last Name
                                    <span className="required">*</span>
                                </span>
                                <input className={`w-full ${errors.last_name && 'border-rose-600'}`} type="text" name='last_name' placeholder='Doe' value={userForm.last_name} onChange={handleChange} />
                                {
                                    errors.last_name && <span className="text-rose-600 italic block mt-1">{errors.last_name.msg}</span>
                                }
                            </label>
                        </div>
                        <label>
                            <span className='block text-black mb-1'>
                                Emaill Address
                                <span className="required">*</span>
                            </span>
                            <input className={`w-full ${errors.email && 'border-rose-600'}`} type="email" name='email' placeholder='me@mail.com' value={userForm.email} onChange={handleChange} />
                            {
                                errors.email && <span className="text-rose-600 italic block mt-1">{errors.email.msg}</span>
                            }
                        </label>
                        <label>
                            <span className='block text-black mb-1'>
                                Password
                                <span className="required">*</span>
                            </span>
                            <input className={`w-full ${(errors.error || errors.password) && 'border-rose-600'}`} type="password" name='password' placeholder='Enter your password' value={userForm.password} onChange={handleChange} />
                            {
                                errors.password && <span className="text-rose-600 italic block mt-1">{errors.password.msg}</span>
                            }
                        </label>
                        <label>
                            <span className='block text-black mb-1'>
                                Confirm Password
                                <span className="required">*</span>
                            </span>
                            <input className={`w-full ${errors.error && 'border-rose-600'}`} type="password" name='confirm_password' placeholder='Confirm your password' value={userForm.confirm_password} onChange={handleChange} />
                            {
                                errors.error && <span className="text-rose-600 italic block mt-1">{errors.error}</span>
                            }
                        </label>
                        <button className='primary-btn mt-5'>
                            {
                                loading
                                    ?
                                    <div className='flex items-center gap-2'>
                                        <Icon icon="gravity-ui:arrows-rotate-right" className='animate-spin' fontSize={20} />
                                        <span>Loading...</span>
                                    </div>
                                    :
                                    <span>Create account</span>
                            }
                        </button>
                        <p className='text-center mt-4'>
                            Already have an account yet? <Link to='/login' className='underline text-sky-500 transition-all ease-in-out hover:text-sky-400'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup