import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { userService } from '../services/userService'
import { loadUser, login, signup } from '../store/actions/userActions'
import { ReactComponent as HomeLogo } from '../assets/imgs/HomeLogo.svg'

export function HomePage() {
  const phoneInputRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  const onLogin = async (ev) => {
    ev.preventDefault()
    const user = await userService.getUserByPhone(phoneInputRef.current.value)
    if (!user) return console.log('Fill the inputs')

    dispatch(login(user))
    navigate('/chat')
  }

  const onSignup = async (ev, { phone, name, status }) => {
    ev.preventDefault()
    if (!phone || !name || !status) return console.log('Fill the inputs')
    if (await userService.getUserByPhone(phoneInputRef.current.value)) return console.log('phone already exist')

    dispatch(signup(phone, name, status))
    navigate('/chat')
  }

  return (
    <section className='home-page flex column auto-center'>

      <HomeLogo style={{ color: '#54656f' }} />
      <h1>Log In to WusApp</h1>
      <p>And start messaging easy</p>

      <form onSubmit={onLogin}>
        <input className='login-input' ref={phoneInputRef} type="text" placeholder='Enter your phone number' />
      </form>
      <button className='btn' onClick={onLogin}>Log In</button>
      <div className='text-center'>
        <button className='btn' onClick={() => navigate('/signup')}>Sign Up</button>
        <button className='btn start-demo-btn' onClick={() => navigate('/chat')}>Start Demo</button>
      </div>

      <Outlet context={onSignup} />
    </section>
  )
}