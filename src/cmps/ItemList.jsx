import { ItemPreview } from './ItemPreview'

export function ItemList({ items, onSelectItemId, onRemoveItem }) {
    return (
        <section className='item-list'>
            {items.map(item => <ItemPreview key={item._id} item={item} onRemoveItem={onRemoveItem} />)}
        </section>
    )
}
