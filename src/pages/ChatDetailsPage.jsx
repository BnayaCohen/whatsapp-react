import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadChat } from '../store/actions/chatActions'
import { updateUser } from '../store/actions/userActions'
import { userService } from '../services/userService.js'
import { MsgList } from '../cmps/MsgList'
import sendMsgIcon from '../assets/imgs/sendMsgIcon.svg'

export function ChatDetailsPage() {

  const currUser = useSelector(state => state.userModule.loggedInUser)
  const currChat = useSelector(state => state.chatModule.currChat)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    dispatch(loadChat(params.id))
  }, [params.id])

  const onBack = () => {
    navigate('/')
  }

  if (!currChat) return <div>Loading...</div>
  const chatUser = userService.getUserById(currChat.userId)
  const chatUserStyle = { backgroundImage: `url(https://robohash.org/${currChat.userId})` }
  return (
      <article className='chat-details flex column space-between'>
        <section className='chat-header flex'>
          <div className="user-img" style={chatUserStyle}></div>
          <div>
            <h3>{chatUser.name}</h3>
            <p>Last seen at {new Date(chatUser.lastSeen).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }).substring(0, 5)}</p>
          </div>
        </section>
        <section className='chat-messages'>
          <MsgList msgs={currChat.msgs} />
        </section>
        <section className='chat-inputs flex align-center'>
          <input type="text" />
          <button className='send-msg-btn'>
          <img src="imgs/sendMsgIcon.svg" alt="Send" />
          </button>
        </section>
        {/* <button className='btn' onClick={onBack}>Back</button> */}
        {/* <Link className='btn' to={'/chat/edit/' + currChat._id} >Edit chat</Link> */}
      </article>
  )
}