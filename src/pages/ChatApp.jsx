import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { ChatFilter } from '../cmps/ChatFilter'
import { ChatList } from '../cmps/ChatList'
import { loadChats, setFilterBy } from '../store/actions/chatActions'
import { loadUser, loadUsers } from '../store/actions/userActions'
import { ReactComponent as NewChat } from '../assets/imgs/NewChatIcon.svg'
import { ReactComponent as NoChatLogo } from '../assets/imgs/NoChatLogo.svg'
import { NewChatModal } from '../cmps/NewChatModal'

export function ChatApp() {

    const currUser = useSelector(state => state.userModule.loggedInUser)
    const { chats } = useSelector(state => state.chatModule)
    const [isNewChatModalOpen, setToggleNewChatModal] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadUsers())
        dispatch(loadUser())
        dispatch(loadChats())
    }, [])

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadChats())
    }

    const toggleNewChatModal = () => {
        setToggleNewChatModal(!isNewChatModalOpen)
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
                    <NewChat className='new-chat-btn' onClick={toggleNewChatModal} />
                    {isNewChatModalOpen && <NewChatModal currUserId={currUser._id} toggleNewChatModal={toggleNewChatModal} />}
                </article>

                <ChatFilter onChangeFilter={onChangeFilter} />

                {chats?.length > 0 ?
                    <ChatList currUserId={currUser._id} chats={chats} />
                    : <div className='no-chats'><p>Couldn't find chats...</p></div>}
            </section>

            <section className='chat-details'>
                {params.id ? <Outlet /> :
                    <div className='empty-chat-details flex column align-center justify-center'>
                        <NoChatLogo className='empty-chat-logo' />
                        <h1>WusApp Web</h1>
                        <div className='empty-chat-intro'>You can send messages without keeping the phone connected.</div>
                    </div>
                }
            </section>
        </div>
    )
}