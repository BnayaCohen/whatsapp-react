import { useState } from "react"
import { useSelector } from "react-redux"
import { ReactComponent as SendMsgIcon } from '../assets/imgs/sendMsgIcon.svg'
import { userService } from "../services/userService"
import { ChatList } from "./ChatList"

export function NewChatModal({ currUserId, toggleNewChatModal }) {

  const [phoneInput, setPhone] = useState('')
  const { users } = useSelector(state => state.userModule)
  const { chats } = useSelector(state => state.chatModule)

  const handleChange = ({ target }) => {
    setPhone(() => target.value)
  }

  const onStartNewChat = () => {
    if (!phoneInput) return

    const newChatUser = users.find(user => user.phone === phoneInput)
    if (!newChatUser) alert('user does not exist')

  }

  return (<section className='new-chat-modal'>
    <form onSubmit={onStartNewChat}>
      <p className="close-btn" onClick={toggleNewChatModal}>X</p>
      <h2>Start a new chat</h2>
      <div className="flex align-center" style={{ gap: '6px' }}>
        <input value={phoneInput} onChange={handleChange} type="text" placeholder='Enter phone number' />
        <SendMsgIcon onClick={onStartNewChat} style={{ color: '#54656f' }} />
      </div>
    </form>
    <article className='user-list'>
      {users.map(user =>
        <div className="flex align-center" key={user._id}>
          <div className="user-img" style={{ backgroundImage: `url(https://robohash.org/${user._id})`,margin:'4px 0' }}></div>
          <h1>{user.name}</h1>
        </div>
      )}
    </article>
  </section>
  )
}