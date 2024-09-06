import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux';
import { googleAuth, signin } from '../store/slices/usersSlice';
import { useState } from 'react';



function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, errors } = useSelector(state => state.users)
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }
    
    const googleLogin = useGoogleLogin({
        onSuccess: async codeResponse => {
            dispatch(googleAuth({access_token: codeResponse.access_token, credentials: "", navigate}))
        },
        onError: error => {
            console.log(error);
        }
    })
    
    const login = (e) => {
        e.preventDefault()
        dispatch(signin({userData, navigate}))
    }
    
    return (
        <div className='login-page'>
            <div className="container px-4 min-h-screen grid place-items-center">
                <div className='login-box p-10 px-8 border rounded-lg shadow-md md:w-[450px] w-full mx-auto'>
                    <h1 className='text-center text-xl capitalize font-bold'>welcome to Memories</h1>
                    <form className='mt-5 flex flex-col gap-5' onSubmit={login}>
                        <label>
                            <span className='block text-black mb-1'>
                                Emaill Address
                            </span>
                            <input className={`w-full ${errors.email ? 'border-rose-700' : ''}`} type="email" name='email' placeholder='me@mail.com' value={userData.email} onChange={handleChange} />
                            {
                                errors.email ? <span className='block mt-1 italic text-rose-700'>{ errors.email.msg }</span> : null
                            }
                        </label>
                        <label>
                            <span className='block text-black mb-1'>
                                Password
                            </span>
                            <input className={`w-full ${errors.password ? 'border-rose-700' : ''}`} type="password" name='password' placeholder='Enter your password' value={userData.password} onChange={handleChange} />
                            {
                                errors.password ? <span className='block mt-1 italic text-rose-700'>{ errors.password.msg }</span> : null
                            }
                        </label>
                        <button className={`primary-btn mt-2 ${loading ? 'bg-sky-500 opacity-50' : ''}`}
                            disabled={loading}>
                            {
                                loading
                                    ?
                                    <div className='flex items-center gap-2'>
                                        <Icon icon="gravity-ui:arrows-rotate-right" className='animate-spin' fontSize={20} />
                                        <span>Loading...</span>
                                    </div>
                                    :
                                    <span>Login</span>
                            }
                        </button>
                    </form>
                    <div className='relative before:content-["OR"] before:grid before:place-items-center before:absolute before:bg-white before:text-neutral-500 before:w-10 before:h-10 before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2'>
                        <hr className='my-8' />
                    </div>
                    <button className='google-btn w-full p-2.5 px-4 rounded-lg flex items-center justify-start border duration-200 transition-all ease-in-out hover:bg-blue-50 font-light'
                        onClick={googleLogin}>
                        <Icon icon='logos:google-icon' className='me-1' fontSize={20} />
                        <span className='grow'>Continue with Google</span>
                    </button>
                    <p className='text-center mt-5'>
                        Don't have an account yet? <Link to='/signup' className='underline text-sky-500 transition-all ease-in-out hover:text-sky-400'>Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login