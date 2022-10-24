import { ChatPreview } from './ChatPreview'

export function ChatList({ chats, currUserId }) {
    return (
        <section className='chat-list'>
            {chats.map(chat => <ChatPreview key={chat._id} chat={chat} currUserId={currUserId} />)}
        </section>
    )
}
