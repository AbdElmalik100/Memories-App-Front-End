import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import UserItem from './UserItem';
import UserNotification from './UserNotification';


function Header() {
    const user = useSelector(state => state.users.user)
    
    return (
        <header className="flex relative items-center justify-between gap-5 p-4 px-8 border-b">
            <Link to='/'>
                <h2 className="uppercase font-bold text-3xl">Memories</h2>
            </Link>
            <div className="social-icons hidden items-center gap-2 md:flex">
                <a href="https://www.facebook.com/abdelmalik.abdelghafar" target="_blank" className='w-8 h-8 border text-gray-600 rounded-full grid place-items-center transition ease-in-out hover:bg-sky-500 hover:border-sky-500 hover:text-white'>
                    <Icon icon="ri:facebook-fill" fontSize={20} />
                </a>
                <a href="https://www.instagram.com/abdelmalik.abdelghafar" target="_blank" className='w-8 h-8 border text-gray-600 rounded-full grid place-items-center transition ease-in-out hover:bg-sky-500 hover:border-sky-500 hover:text-white'>
                    <Icon icon="ri:instagram-fill" fontSize={20} />
                </a>
                <a href="https://twitter.com/Abd_elmalik_" target="_blank" className='w-8 h-8 border text-gray-600 rounded-full grid place-items-center transition ease-in-out hover:bg-sky-500 hover:border-sky-500 hover:text-white'>
                    <Icon icon="ri:twitter-x-fill" fontSize={20} />
                </a>
                <a href="https://github.com/AbdElmalik100" target="_blank" className='w-8 h-8 border text-gray-600 rounded-full grid place-items-center transition ease-in-out hover:bg-sky-500 hover:border-sky-500 hover:text-white'>
                    <Icon icon="mingcute:github-fill" fontSize={20} />
                </a>
            </div>
            {
                user
                    ?
                    <div className='user flex items-center gap-4'>
                        <UserNotification />
                        <UserItem />
                    </div>
                    :
                    <div className='auth flex gap-2'>
                        <Link to='/signup' className='secondary-btn'>Sign up</Link>
                        <Link to='/login' className='primary-btn'>Login</Link>
                    </div>
            }
        </header>
    )
}

export default Header