import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export function NewChatModal({ currUserId, toggleNewChatModal }) {

  const [phoneInput, setPhone] = useState('')
  const { users } = useSelector(state => state.userModule)
  const { chats } = useSelector(state => state.chatModule)
  let [usersToShow, setUsersToShow] = useState([...users])
  const navigate = useNavigate()

  const handleChange = ({ target }) => {
    setPhone(() => target.value)
    const regex = new RegExp(target.value, 'i')
    setUsersToShow(() => users.filter(user => (regex.test(user.phone) || regex.test(user.name))))
  }

  const onStartNewChat = (userId) => {
    console.log(chats);
    const selectedChat = chats.find(chat => (chat.user1Id === userId && chat.user2Id === currUserId)
      || (chat.user2Id === userId && chat.user1Id === currUserId))
    if (selectedChat) { navigate('/chat/' + selectedChat._id) }
    else {

    }
    toggleNewChatModal()
  }

  return (<section className='new-chat-modal'>
    <form onSubmit={onStartNewChat}>
      <p className="close-btn" onClick={toggleNewChatModal}>X</p>
      <h2>Start a new chat</h2>

      <input value={phoneInput} onChange={handleChange} type="text" placeholder='Search by phone or name' />
    </form>
    <article className='user-list'>
      {usersToShow.map(user =>
        <div className="user-preview flex align-center" key={user._id} onClick={() => onStartNewChat(user._id)}>
          <div className="user-img" style={{ backgroundImage: `url(https://robohash.org/${user._id})`, margin: '4px 0' }}></div>
          <div>
            <h1>{user.name}</h1>
            <p className="user-status">{user.status}</p>
          </div>
        </div>
      )}
    </article>
  </section>
  )
}