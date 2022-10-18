import { MsgPreview } from './MsgPreview'

export function MsgList({ msgs }) {
    return (
        <section className='msg-list'>
            {msgs.map((msg, i) => <MsgPreview key={i} msg={msg} />)}
        </section>
    )
}
