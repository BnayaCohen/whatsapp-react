import { ReactComponent as NewChat } from '../assets/imgs/NewChatIcon.svg'
import { ReactComponent as LogoutIcon } from '../assets/imgs/LogoutIcon.svg'
import { NewChatModal } from '../cmps/NewChatModal'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/actions/userActions'
import { useState } from 'react'

export function ChatsHeader({ currUser }) {

  const [isNewChatModalOpen, setToggleNewChatModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleNewChatModal = () => {
    setToggleNewChatModal(!isNewChatModalOpen)
  }

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const userStyle = { backgroundImage: `url(https://robohash.org/${currUser._id})` }
  return (
    <article className='chats-header flex align-center space-between'>
      <div className='flex align-center'>
        <div className="user-img" style={userStyle}></div>
        <h4 className='user-name'>{currUser.name}</h4>
      </div>
      <div className='flex align-center'>
        <NewChat className='new-chat-btn' onClick={toggleNewChatModal} />
        <LogoutIcon className='logout-icon' onClick={onLogout} />
      </div>
      {isNewChatModalOpen ? <NewChatModal currUserId={currUser._id} toggleNewChatModal={toggleNewChatModal} /> : null}
    </article>
  )
}
