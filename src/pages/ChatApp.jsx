import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ChatFilter } from '../cmps/ChatFilter'
import { ChatList } from '../cmps/ChatList'
import { loadChats, removeChat, setFilterBy } from '../store/actions/chatActions'

export function ChatApp() {

    const chats = useSelector(state => state.chatModule.chats)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadChats())
    }, [])

    const onRemoveChat = async (chatId) => {
        dispatch(await removeChat(chatId))
    }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadChats())
    }

    if (!chats) return <div>Loading...</div>
    return (
        <div className='chat-app flex'>
            <section className='chats-display'>
                <ChatList onRemoveChat={onRemoveChat} chats={chats} />
            </section>
            <section className='chat-details'>
                <div>chat!</div>
            </section>






            {/* <ChatFilter onChangeFilter={onChangeFilter} /> */}
            {/* <Link className='btn' to="/chat/edit">Add Chat</Link> */}
        </div>
    )
}