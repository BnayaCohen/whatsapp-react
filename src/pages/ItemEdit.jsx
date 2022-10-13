import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { itemService } from '../services/itemService.js'

export function ItemEdit() {

    const [item, setItem] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchItem() {
            const itemId = params.id
            const item = itemId ? await itemService.getItemById(itemId) : itemService.getEmptyItem()
            setItem(item)
        }
        fetchItem()
    }, [params.id])

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        setItem(item => ({ ...item, [field]: value }))
    }

    const onSaveItem = async (ev) => {
        ev.preventDefault()
        await itemService.saveItem({ ...item })
        navigate('/item')
    }

    const inputRefFunc = (elInput) => {
        elInput && elInput.focus()
    }

    if (!item) return <div>Loading...</div>

    return (
        <section className='item-edit'>
            <h1>{item._id ? 'Edit' : 'Add'} Item</h1>
            <form onSubmit={onSaveItem}>
                <label htmlFor="name">Name</label>
                <input ref={inputRefFunc} value={item.name} onChange={handleChange} type="text" name="name" id="name" />
                <button className='btn'>Save</button>
            </form>
        </section>
    )
}