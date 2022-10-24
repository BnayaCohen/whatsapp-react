import { Link } from 'react-router-dom'
import { userService } from '../services/userService'

export function ChatPreview({ chat, currUserId }) {
  const chatUserIdNum = chat.user1Id === currUserId ? '2' : '1'
  const currChatUser = userService.getUserById(chat[`user${chatUserIdNum}Id`])
  const newMsgsClass = !chat[`isSeenByUser${chatUserIdNum}`] ? 'has-new-msgs':''
  console.log(newMsgsClass);
  const chatUserStyle = { backgroundImage: `url(https://robohash.org/${currChatUser._id})` }
  return (
    <article className={'chat-preview ' + newMsgsClass}>
      <Link className="flex align-center space-between" to={`/chat/${chat._id}`}>
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
