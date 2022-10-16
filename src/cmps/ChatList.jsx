import { ChatPreview } from './ChatPreview'

export function ChatList({ chats, onRemoveChat }) {
    return (
        <section className='chat-list'>
            {chats.map(chat => <ChatPreview key={chat._id} chat={chat} onRemoveChat={onRemoveChat} />)}
        </section>
    )
}
