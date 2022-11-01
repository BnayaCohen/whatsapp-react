import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loadUser, logout } from '../store/actions/userActions'

export function HomePage() {
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

  const onLogout = () => {
    dispatch(logout())
    navigate('/signup')
  }

  if (!currUser) return <div>Loading...</div>
  return (
    <section className='home-page'>
      <h1>Welcome {currUser.name}</h1>
      <button className='btn' onClick={() => onLogout()}>Logout</button>
    </section>
  )
}