import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadChat, addMessage, removeChat } from '../store/actions/chatActions'
import { updateUser } from '../store/actions/userActions'
import { userService } from '../services/userService.js'
import { MsgList } from '../cmps/MsgList'
import { RecordBtn } from '../cmps/RecordBtn'
import { ReactComponent as SendMsgIcon } from '../assets/imgs/sendMsgIcon.svg'

export function ChatDetailsPage() {

  const [msgInput, setMsgInput] = useState('')
  const { users } = useSelector((state => state.userModule))
  const currUser = useSelector(state => state.userModule.loggedInUser)
  const { currChat } = useSelector((state => state.chatModule))
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(loadChat(params.id, currUser._id))
    return () => {
      if (currChat?.msgs.length === 0) {
        console.log('removing chat');
        dispatch(removeChat(currChat._id))
      }
    }
  }, [params.id])

  const handleChange = ({ target }) => {
    setMsgInput(() => target.value)
  }

  const addMsg = (ev) => {
    ev.preventDefault()
    if (!msgInput) return
    const newMsg = { content: msgInput, sentAt: Date.now(), userId: currUser._id }
    dispatch(addMessage(currChat, newMsg))
    setMsgInput(() => '')
  }

  const updateText = (txt) => {
    setMsgInput(() => txt)
  }

  if (!currChat) return <div>Loading...</div>
  const userChatId = currChat.user1Id === currUser._id ? currChat.user2Id : currChat.user1Id
  const chatUser = users.find(user => user._id === userChatId)
  const chatUserStyle = { backgroundImage: `url(https://robohash.org/${chatUser._id})` }

  return (
    <article className='chat-details flex column space-between'>
      <section className='chat-header flex align-center'>
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
        {msgInput ?
          <SendMsgIcon onClick={addMsg} style={{ color: '#54656f' }} />
          :
          <RecordBtn updateText={updateText} />}
      </form>
    </article>
  )
}