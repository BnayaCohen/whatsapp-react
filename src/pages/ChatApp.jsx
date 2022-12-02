import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { ChatsHeader } from '../cmps/ChatsHeader'
import { ChatFilter } from '../cmps/ChatFilter'
import { ChatList } from '../cmps/ChatList'
import { EmptyChatScreen } from '../cmps/EmptyChatScreen'
import { loadChats, setFilterBy } from '../store/actions/chatActions'
import { loadUser, loadUsers } from '../store/actions/userActions'
import { useWindowDimensions } from '../customHooks/useWindowDimensions'

export function ChatApp() {

    const currUser = useSelector(state => state.userModule.loggedInUser)
    const { chats } = useSelector(state => state.chatModule)
    const WindowWidth = useWindowDimensions().width
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadUsers())
        dispatch(loadChats())
    }, [])

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadChats())
    }

    if (!currUser) return <div>Loading...</div>
    return (
        <div className='chat-app flex'>
            {WindowWidth > 560 || !params.id ?
            <section className='chats-display'>
                <ChatsHeader currUser={currUser} />
                <ChatFilter onChangeFilter={onChangeFilter} />

                {chats?.length > 0 ?
                    <ChatList currUserId={currUser._id} chats={chats} />
                    : <div className='no-chats'><p>No chats...</p></div>
                }
            </section>
            : null
            }

            {WindowWidth > 560 || params.id ?
                <section className='chat-details'>
                    {params.id ? <Outlet /> : <EmptyChatScreen />}
                </section>
                : null
            }
        </div>
    )
}