import { useState } from "react"
import { ReactComponent as SendMsgIcon } from '../assets/imgs/sendMsgIcon.svg'
import { userService } from "../services/userService"

export function NewChatModal({ currUserId }) {

  const [phoneInput, setPhone] = useState('')

  const handleChange = ({ target }) => {
    setPhone(() => target.value)
  }

  const onStartNewChat = () => {
    if (!userService.isPhoneExist(phoneInput))
    alert('user does not exist')
  }

  return (
    <form className='chat-inputs flex align-center' onSubmit={addMsg}>

      <input value={phoneInput} onChange={handleChange} type="text" placeholder='Enter phone number' />
      <SendMsgIcon onClick={onStartNewChat} style={{ color: '#54656f' }} />
    </form>
  )
}