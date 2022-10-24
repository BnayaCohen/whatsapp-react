import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { ChatFilter } from '../cmps/ChatFilter'
import { ChatList } from '../cmps/ChatList'
import { loadChats, removeChat, setFilterBy } from '../store/actions/chatActions'
import { loadUser } from '../store/actions/userActions'
import { ReactComponent as NewChat } from '../assets/imgs/NewChatIcon.svg'

export function ChatApp() {

    const currUser = useSelector(state => state.userModule.loggedInUser)
    const chats = useSelector(state => state.chatModule.chats)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadChats())
    }, [])

    const onRemoveChat = async (chatId) => {
        dispatch(await removeChat(chatId))
    }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadChats())
    }

    if (!currUser) return <div>Loading...</div>
    const userStyle = { backgroundImage: `url(https://robohash.org/${currUser._id})` }
    return (
        <div className='chat-app flex'>
            <section className='chats-display'>
                <article className='chats-header flex align-center space-between'>
                    <div className='flex align-center'>
                        <div className="user-img" style={userStyle}></div>
                        <h4 className='user-name'>{currUser.name}</h4>
                    </div>
                    <NewChat className='new-chat-btn' />
                </article>

                <ChatFilter onChangeFilter={onChangeFilter} />

                {chats?.length > 0 ?
                    <ChatList currUserId={currUser._id} chats={chats} />
                    : <div className='no-chats'><p>Couldn't find chats...</p></div>}
            </section>

            <section className='chat-details'>
                <Outlet />
            </section>

            {/* <Link className='btn' to="/chat/edit">Add Chat</Link> */}
        </div>
    )
}