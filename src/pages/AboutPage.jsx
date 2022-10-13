import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loadUser, logout } from '../store/actions/userActions'

export function AboutPage() {
  const user = useSelector(state => state.userModule.loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      if (!user) {
        dispatch(loadUser())
        return
      }
    })()

  }, [user])

  const onLogout = () => {
    dispatch(logout())
    navigate('/signup')
  }

  if (!user) return <div>Loading...</div>
  return (
    <section className='about-page'>
      <h1>About us</h1>
      <button className='btn' onClick={() => onLogout()}>Logout</button>
    </section>
  )
}