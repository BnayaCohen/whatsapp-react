export function MsgPreview({ msg }) {
  const msgStyle = { backgroundColor: msg.isUserSent ? '#d9fdd3' : 'white'}
  return (
    <article className="msg-preview flex" style={msgStyle}>
      <p className="msg-content">{msg.content}</p>
      <p className="msg-time">{new Date(msg.sentAt).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).substring(0,5)}</p>
    </article>
  )
}
