import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadChat } from '../store/actions/chatActions'
import { updateUser } from '../store/actions/userActions'
import { userService } from '../services/userService.js'

export function ChatDetailsPage() {

  const currUser = useSelector(state => state.userModule.loggedInUser)
  const currChat = useSelector(state => state.chatModule.currChat)
  let chatUser
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const chatUserStyle = { backgroundImage: `url(https://robohash.org/${currChat.userId})` }

  useEffect(() => {
    dispatch(loadChat(params.id))
    chatUser = userService.getUserById(currChat.userId)
  }, [params.id])

  const onBack = () => {
    navigate('/')
  }

  if (!currChat && !chatUser) return <div>Loading...</div>
  return (
    <>
      <article className='chat-details'>
        <section className='chat-header flex'>
          <div className="user-img" style={chatUserStyle}></div>
          <div>
            <h3>{chatUser.name}</h3>
            <p>Last seen at {new Date(chatUser.lastSeen).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }).substring(0, 5)}</p>
          </div>
        </section>
        {/* <button className='btn' onClick={onBack}>Back</button> */}
        {/* <Link className='btn' to={'/chat/edit/' + currChat._id} >Edit chat</Link> */}
      </article>
    </>
  )
}