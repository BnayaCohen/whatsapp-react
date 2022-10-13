import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MovesList } from '../cmps/MovesList';
import { TransferFund } from '../cmps/TransferFund';
import { loadItem } from '../store/actions/itemActions'
import { updateUser } from '../store/actions/userActions'
import { userService } from '../services/userService.js'

export function ItemDetailsPage() {

  const [movesList, setMovesList] = useState([])
  const currUser = useSelector(state => state.userModule.loggedInUser)
  const currItem = useSelector(state => state.itemModule.currItem)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    dispatch(loadItem(params.id))
  }, [params.id])

  const loadMovesList = (user) => {
    const userMoves = user.moves.filter(move => move.toId === currItem._id)
    setMovesList(userMoves)
  }

  const onBack = () => {
    navigate('/item')
  }

  const onTransferCoins = (item, amount) => {
    const user = userService.addMove(item, amount)
    dispatch(updateUser(user))
    loadMovesList(user)
  }

  if (!currItem) return <div>Loading...</div>
  return (
    <>
      <article className='item-details'>
        <img src={`https://robohash.org/${currItem._id}`} alt="" />
        <h1>{currItem.name}</h1>
        <p><span>Phone: </span>{currItem.phone}</p>
        <p><span>Email: </span>{currItem.email}</p>
        <button className='btn' onClick={onBack}>Back</button>
        <Link className='btn' to={'/item/edit/' + currItem._id} >Edit item</Link>
      </article>
      <TransferFund item={currItem} maxCoins={currUser.coins} onTransferCoins={onTransferCoins} />
      <MovesList title={'Your Moves:'} movesList={movesList} />
    </>
  )
}