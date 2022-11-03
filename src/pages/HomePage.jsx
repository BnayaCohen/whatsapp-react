import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userService } from '../services/userService'
import { loadUser, login, logout } from '../store/actions/userActions'

export function HomePage() {
  const [phoneInput, setPhoneInput] = useState('')
  const currUser = useSelector(state => state.userModule.loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      if (!currUser) {
        dispatch(loadUser())
        return
      }
    })()

  }, [currUser])

  const handleChange = ({ target }) => {
    setPhoneInput(() => target.value)
  }

  const onLogin = async (ev) => {
    ev.preventDefault()
    const user = await userService.isPhoneExist(phoneInput)
    if (!user) return

    dispatch(login(user))
    navigate('/chat')
  }

  if (!currUser) return <div>Loading...</div>
  return (
    <section className='home-page'>
      <img src="https://static.facebook.com/images/whatsapp/www/whatsapp-promo.png" alt="" />
      <form onSubmit={onLogin}>
        <input value={phoneInput} onChange={handleChange} type="text" name="term" placeholder='Enter your phone number' />
        <button className='btn'>Log In</button>
      </form>
      {/* <button className='btn'>Sign Up</button> */}
    </section>
  )
}