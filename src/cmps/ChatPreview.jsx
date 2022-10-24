import { Link } from 'react-router-dom'
import { userService } from '../services/userService'

export function ChatPreview({ chat, currUserId }) {
  const currChatUser = userService.getUserById(chat.user1Id === currUserId ? chat.user2Id : chat.user1Id)

  const chatUserStyle = { backgroundImage: `url(https://robohash.org/${currChatUser._id})` }
  return (
    <article className="chat-preview">
      <Link className='flex align-center space-between' to={`/chat/${chat._id}`}>
        <div className='flex'>
          <div className="user-img" style={chatUserStyle}></div>
          <div>
            <h3>{currChatUser.name}</h3>
            <p className='last-msg'>{chat.msgs[chat.msgs.length - 1].content}</p>
          </div>
        </div>
        <p className='last-msg-time'>{new Date(chat.msgs[0].sentAt).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }).substring(0, 5)}</p>
      </Link>
    </article>
  )
}
