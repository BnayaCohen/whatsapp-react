import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function ChatPreview({ chat, currUserId }) {

  const { users } = useSelector(state => state.userModule)
  const { currChat } = useSelector(state => state.chatModule)

  const chatUserIdNum = chat.user1Id === currUserId ? 2 : 1
  const currChatUser = users.find(user => user._id === chat[`user${chatUserIdNum}Id`])

  // Setting classes for the message preview
  let chatPreviewClass = 'chat-preview '
  if (!chat[`isSeenByUser${chatUserIdNum === 2 ? 1 : 2}`]) chatPreviewClass += 'has-new-msgs '
  if (currChat?._id === chat._id) chatPreviewClass += 'selected-chat'

  const chatUserStyle = { backgroundImage: `url(https://robohash.org/${currChatUser._id})` }

  return (
    <article className={chatPreviewClass}>
      <Link className="flex align-center space-between" to={`/chat/${chat._id}`}>
        <div className='flex'>
          <div className="user-img" style={chatUserStyle}></div>
          <div>
            <h3>{currChatUser.name}</h3>
            <p className='last-msg'>{chat.msgs[chat.msgs.length - 1]?.content}</p>
          </div>
        </div>
        <p className='last-msg-time'>{chat.msgs.length !== 0 && new Date(chat.msgs[chat.msgs.length - 1]?.sentAt).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }).substring(0, 8)}</p>
      </Link>
    </article>
  )
}
