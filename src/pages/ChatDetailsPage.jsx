import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadChat, addMessage } from '../store/actions/chatActions'
import { updateUser } from '../store/actions/userActions'
import { userService } from '../services/userService.js'
import { MsgList } from '../cmps/MsgList'
import { ReactComponent as SendMsgIcon } from '../assets/imgs/sendMsgIcon.svg'

export function ChatDetailsPage() {

  const [msgInput, setMsgInput] = useState('')
  const currUser = useSelector(state => state.userModule.loggedInUser)
  const currChat = useSelector((state => state.chatModule.currChat))
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
    if (!msgInput) return
    const newMsg = { content: msgInput, sentAt: Date.now(),userId:currUser._id}
    dispatch(addMessage(currChat, newMsg))
    setMsgInput(() => '')
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
          <h4>{chatUser.name}</h4>
          <p>Last seen at {new Date(chatUser.lastSeen).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }).substring(0, 5)}</p>
        </div>
      </section>
      <section className='chat-messages'>
        <MsgList msgs={currChat.msgs} />
      </section>
      <form className='chat-inputs flex align-center' onSubmit={addMsg}>
        <input value={msgInput} onChange={handleChange} type="text" placeholder='Write a message' />
        <SendMsgIcon onClick={addMsg} style={{color:'#54656f'}} />
      </form>
      {/* <button className='btn' onClick={onBack}>Back</button> */}
      {/* <Link className='btn' to={'/chat/edit/' + currChat._id} >Edit chat</Link> */}
    </article>
  )
}