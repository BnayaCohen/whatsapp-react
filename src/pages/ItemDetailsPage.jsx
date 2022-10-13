import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadItem } from '../store/actions/itemActions'
import { updateUser } from '../store/actions/userActions'
import { userService } from '../services/userService.js'

export function ItemDetailsPage() {

  const currUser = useSelector(state => state.userModule.loggedInUser)
  const currItem = useSelector(state => state.itemModule.currItem)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    dispatch(loadItem(params.id))
  }, [params.id])

  const onBack = () => {
    navigate('/item')
  }

  if (!currItem) return <div>Loading...</div>
  return (
    <>
      <article className='item-details'>
        <h1>{currItem.name}</h1>
        <button className='btn' onClick={onBack}>Back</button>
        <Link className='btn' to={'/item/edit/' + currItem._id} >Edit item</Link>
      </article>
    </>
  )
}