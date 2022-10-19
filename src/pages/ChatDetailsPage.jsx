import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadChat, addMessage } from '../store/actions/chatActions'
import { updateUser } from '../store/actions/userActions'
import { userService } from '../services/userService.js'
import { MsgList } from '../cmps/MsgList'
import sendMsgIcon from '../assets/imgs/sendMsgIcon.svg'

export function ChatDetailsPage() {

  const [msgInput, setMsgInput] = useState('')
  const currUser = useSelector(state => state.userModule.loggedInUser)
  const currChat = useSelector(state => state.chatModule.currChat)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    dispatch(loadChat(params.id))
  }, [params.id])

  const handleChange = ({ target }) => {
    setMsgInput(() => target.value)
  }

  const addMsg = () => {
    dispatch(addMessage(currChat, { content: msgInput, sentAt: Date.now(), isUserSent: true }))
  }

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
        <input value={msgInput} onChange={handleChange} type="text" placeholder='Write a message' />
        <button className='send-msg-btn'>
          <img src={sendMsgIcon} alt="Send" onClick={addMsg} />
        </button>
      </section>
      {/* <button className='btn' onClick={onBack}>Back</button> */}
      {/* <Link className='btn' to={'/chat/edit/' + currChat._id} >Edit chat</Link> */}
    </article>
  )
}