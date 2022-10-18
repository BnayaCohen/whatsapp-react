import { MsgPreview } from './MsgPreview'

export function MsgList({ msgs }) {
    return (
        <section className='msg-list'>
            {msgs.map(msg => <MsgPreview key={msg._id} msg={msg} />)}
        </section>
    )
}
