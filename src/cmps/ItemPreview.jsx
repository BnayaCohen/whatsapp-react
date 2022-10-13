import { Link } from 'react-router-dom'

export function ItemPreview({ item, onRemoveItem }) {

  const itemStyle = { backgroundImage: `url(https://robohash.org/${item._id})` }
  return (
    <article className="item-preview">
      <Link className='flex align-center' to={`/item/${item._id}`}>
        <div className="item-img" style={itemStyle}></div>
        <div>
          <h3>{item.name}</h3>
          <p>{item.email}</p>
        </div>
      </Link>
      <section className='actions'>
        <button className='btn' onClick={() => onRemoveItem(item._id)}>Delete</button>
        <Link className='btn' to={`/item/edit/${item._id}`} >Edit</Link>
      </section>
    </article>
  )
}
