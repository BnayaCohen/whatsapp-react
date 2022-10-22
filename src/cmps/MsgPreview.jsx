export function MsgPreview({ msg }) {
  const msgClass = msg.isUserSent ? 'outgoing-msg' : 'incoming-msg'
  return (
    <article className={'msg-preview flex ' + msgClass}>
      <p className="msg-content">{msg.content}</p>
      <p className="msg-time">{new Date(msg.sentAt).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }).substring(0, 5)}</p>
    </article>
  )
}
