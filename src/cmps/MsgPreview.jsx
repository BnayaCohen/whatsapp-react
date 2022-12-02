import { useSelector } from "react-redux"
import { ReactComponent as MsgTail } from '../assets/imgs/MsgTail.svg'
import { ReactComponent as DoubleVIcon } from '../assets/imgs/DoubleVIcon.svg'

export function MsgPreview({ msg, lastMsgId }) {

  const currUser = useSelector(state => state.userModule.loggedInUser)
  const msgClass = msg.userId === currUser._id ? 'outgoing' : 'incoming'
  const msgSpace = msg.userId !== lastMsgId ? 'msg-space' : ''

  return (
    <article className={`msg-preview flex ${msgClass}-msg ${msgSpace + '-' + msgClass}`}>
      {(msgSpace && msgClass === 'outgoing') && <MsgTail className="msg-tail" />}
      <p className="msg-content">{msg.content}</p>
      <div className="flex">
        <p className="msg-time">
          {new Date(msg.sentAt).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }).substring(0, 5)}
        </p>
        {msgClass === 'outgoing' ? <DoubleVIcon className="v-icon" /> : null}
      </div>
      {(msgSpace && msgClass === 'incoming') ? <MsgTail className="msg-tail" /> : null}
    </article>
  )
}
