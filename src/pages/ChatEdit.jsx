import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { chatService } from '../services/chatService.js'

export function ChatEdit() {

    const [chat, setChat] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchChat() {
            const chatId = params.id
            const chat = chatId ? await chatService.getChatById(chatId) : chatService.getEmptyChat()
            setChat(chat)
        }
        fetchChat()
    }, [params.id])

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        setChat(chat => ({ ...chat, [field]: value }))
    }

    const onSaveChat = async (ev) => {
        ev.preventDefault()
        await chatService.saveChat({ ...chat })
        navigate('/chat')
    }

    const inputRefFunc = (elInput) => {
        elInput && elInput.focus()
    }

    if (!chat) return <div>Loading...</div>

    return (
        <section className='chat-edit'>
            <h1>{chat._id ? 'Edit' : 'Add'} Chat</h1>
            <form onSubmit={onSaveChat}>
                <label htmlFor="name">Name</label>
                <input ref={inputRefFunc} value={chat.name} onChange={handleChange} type="text" name="name" id="name" />
                <button className='btn'>Save</button>
            </form>
        </section>
    )
}