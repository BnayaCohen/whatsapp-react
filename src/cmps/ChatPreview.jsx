import { Link } from 'react-router-dom'
import { userService } from '../services/userService'

export function ChatPreview({ chat, onRemoveChat }) {
  const currUser = userService.getUserById(chat.userId)

  const chatUserStyle = { backgroundImage: `url(https://robohash.org/${chat.userId})` }
  return (
    <article className="chat-preview">
      <Link className='flex align-center space-between' to={`/chat/${chat._id}`}>
        <div className='flex'>
        <div className="user-img" style={chatUserStyle}></div>
        <div>
          <h3>{currUser.name}</h3>
          <p>{chat.msgs[0].content}</p>
        </div>
        </div>
        <div>
          <p>{new Date(chat.msgs[0].sentAt).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).substring(0,5)}</p>
        </div>
      </Link>
      {/* <section className='actions'>
        <button className='btn' onClick={() => onRemoveChat(chat._id)}>Delete</button>
        <Link className='btn' to={`/chat/edit/${chat._id}`} >Edit</Link>
      </section> */}
    </article>
  )
}
