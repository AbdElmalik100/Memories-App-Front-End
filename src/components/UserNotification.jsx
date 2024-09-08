import { Icon } from '@iconify/react/dist/iconify.js'
import { useClickAway } from '@uidotdev/usehooks'
import moment from 'moment'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function UserNotification() {
    const { notifications } = useSelector(state => state.notifications)
    const [showNotification, setShowNotification] = useState(false)
    
    const userNotification = useClickAway(() => {
        setShowNotification(false)
    })

    return (
        <div ref={userNotification} className='notification relative'>
            <div className='relative rounded-full grid place-items-center cursor-pointer transition-all ease-in-out hover:text-sky-400'
                onClick={() => setShowNotification(val => !val)}
            >
                {
                    notifications.length > 0 &&
                    <span className="absolute -top-1 -right-1 grid place-items-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative rounded-full h-4 w-4 bg-rose-500 text-white grid place-items-center text-xs">{notifications.length}</span>
                    </span>
                }
                <Icon icon='mingcute:notification-line' fontSize={24} />
            </div>
            <div className={`notification-wrapper min-h-[250px] border transition-all ease-in-out z-20 bg-white absolute top-8 right-0 rounded-lg shadow-md w-[350px] p-3 ${showNotification ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'}`}>
                <h3 className='font-bold text-lg mb-3 ms-2'>Notifications</h3>
                <div className='notifications overflow-auto max-h-[400px]'>
                    {
                        notifications.length > 0
                            ?
                            notifications.map(notification => (
                                <div className='notification-box p-2 flex items-start gap-3 transition-all ease-in-out hover:bg-neutral-50 rounded-lg cursor-pointer'>
                                    <img src={notification.sender.avatar ? notification.sender.avatar : 'https://placehold.co/100X100?text=?'} className='w-12 h-12 rounded-full' alt="" />
                                    <div className='info'>
                                        <p>
                                            <span className='capitalize font-bold'>{notification.sender.first_name} </span>
                                            <span>{notification.message} </span>
                                            <span>"{notification.post.title}"</span>
                                        </p>
                                        <span className='block text-sky-500 text-xs font-light'>
                                            {moment(notification.created_at).fromNow()}
                                        </span>
                                    </div>
                                    <span className='read-dot w-2 h-2 rounded-full bg-sky-500 ms-auto justify-center self-center'></span>
                                </div>
                            ))
                            :
                            <div className='empty w-full h-[250px] grid place-items-center text-neutral-400'>
                                <div className='wrapper flex items-center gap-2 flex-col'>
                                    <Icon icon='hugeicons:notification-snooze-01' fontSize={35} />
                                    <span>No notifications to show</span>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserNotification