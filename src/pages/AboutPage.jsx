import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { bitcoinService } from '../services/bitcoinService.js'
import { MovesList } from '../cmps/MovesList';
import { loadUser, logout } from '../store/actions/userActions'

export function HomePage() {

  const [bitcoinRate, setBitcoinRate] = useState(0)
  const [movesList, setMovesList] = useState([])
  const user = useSelector(state => state.userModule.loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      if (!user) {
        dispatch(loadUser())
        return
      }
      setBitcoinRate(await bitcoinService.getRate(user.coins))
      setMovesList(user.moves.filter((move, i) => i < 3))
    })()

  }, [user])

  const onLogout = () => {
    dispatch(logout())
    navigate('/signup')
  }

  if (!user) return <div>Loading...</div>
  return (
    <section className='home-page'>
      <h1>Welcome {user.name}</h1>

      <h3>You have {user.coins} coins</h3>
      <h3>BTC: {bitcoinRate}</h3>
      <button className='btn' onClick={() => onLogout()}>Logout</button>
      <MovesList title={'Your last 3 moves:'} movesList={movesList} />
    </section>
  )
}