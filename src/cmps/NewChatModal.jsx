import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addChat } from "../store/actions/chatActions"
import { UserList } from "./UserList"

export function NewChatModal({ currUserId, toggleNewChatModal }) {

  const [phoneInput, setPhone] = useState('')
  const { users } = useSelector(state => state.userModule)
  const { chats } = useSelector(state => state.chatModule)
  let [usersToShow, setUsersToShow] = useState([...users])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = ({ target }) => {
    setPhone(target.value)
    const regex = new RegExp(target.value, 'i')
    setUsersToShow(users.filter(user => (regex.test(user.phone) || regex.test(user.name))))
  }

  const onStartNewChat = async (userId) => {
    const selectedChat = chats.find(chat => (chat.user1Id === userId && chat.user2Id === currUserId)
      || (chat.user2Id === userId && chat.user1Id === currUserId))
    if (selectedChat) { navigate('/chat/' + selectedChat._id) }
    else {
      const { _id } = await dispatch(addChat({
        user1Id: currUserId,
        user2Id: userId,
        isSeenByUser1: true,
        isSeenByUser2: false,
        msgs: []
      }))
      navigate('/chat/' + _id)
    }
    toggleNewChatModal()
  }

  return (<section className='new-chat-modal'>
    <form onSubmit={onStartNewChat}>
      <p className="close-btn" onClick={toggleNewChatModal}>X</p>
      <h2>Start new chat</h2>

      <input value={phoneInput} onChange={handleChange} type="text" placeholder='Search by phone or name' />
    </form>
    <UserList users={usersToShow} onStartNewChat={onStartNewChat} />
  </section>
  )
}