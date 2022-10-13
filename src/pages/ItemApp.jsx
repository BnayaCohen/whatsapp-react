import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ItemFilter } from '../cmps/ItemFilter'
import { ItemList } from '../cmps/ItemList'
import { loadItems, removeItem, setFilterBy } from '../store/actions/itemActions'

export function ItemPage() {

    const items = useSelector(state => state.itemModule.items)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadItems())
    }, [])

    const onRemoveItem = async (itemId) => {
        dispatch(await removeItem(itemId))
    }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadItems())
    }

    if (!items) return <div>Loading...</div>
    return (
        <div className='item-page'>
            <ItemFilter onChangeFilter={onChangeFilter} />
            <Link className='btn' to="/item/edit">Add Item</Link>
            <ItemList onRemoveItem={onRemoveItem} items={items} />
        </div>
    )
}