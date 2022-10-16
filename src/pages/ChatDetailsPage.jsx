import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadChat } from '../store/actions/chatActions'
import { updateUser } from '../store/actions/userActions'
import { userService } from '../services/userService.js'

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
    navigate('/chat')
  }

  if (!currChat) return <div>Loading...</div>
  return (
    <>
      <article className='chat-details'>
        <h1>{currChat.name}</h1>
        <button className='btn' onClick={onBack}>Back</button>
        <Link className='btn' to={'/chat/edit/' + currChat._id} >Edit chat</Link>
      </article>
    </>
  )
}