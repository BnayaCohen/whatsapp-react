import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { userService } from '../services/userService'
import { loadUser, login, signup } from '../store/actions/userActions'
import { ReactComponent as HomeLogo } from '../assets/imgs/HomeLogo.svg'

export function HomePage() {
  const phoneInputRef = useRef()
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

  const onLogin = async (ev) => {
    ev.preventDefault()
    const user = await userService.isPhoneExist(phoneInputRef.current.value)
    if (!user) return

    dispatch(login(user))
    navigate('/chat')
  }

  const onSignup = async (ev, { phone, name, status }) => {
    ev.preventDefault()
    if (!phone || !name || !status) return
    if (await userService.isPhoneExist(phoneInputRef.current.value)) return console.log('phone already exist')

    dispatch(signup(phone, name, status))
    navigate('/chat')
  }

  if (!currUser) return <div>Loading...</div>
  return (
    <section className='home-page flex column auto-center'>
      {/* <img src="https://static.facebook.com/images/whatsapp/www/whatsapp-promo.png" alt="" /> */}
      <HomeLogo style={{color:'#54656f'}}/>
      <form className='flex' onSubmit={onLogin}>
        <input ref={phoneInputRef} type="text" placeholder='Enter your phone number' />
        <button className='btn'>Log In</button>
      </form>
      <button className='btn' onClick={() => navigate('/signup')}>Sign Up</button>
      <button className='btn' onClick={() => navigate('/chat')}>Start Demo</button>
      <Outlet context={onSignup} />
    </section>
  )
}