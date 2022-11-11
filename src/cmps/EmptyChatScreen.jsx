import { ReactComponent as NoChatLogo } from '../assets/imgs/NoChatLogo.svg'

export function EmptyChatScreen() {
  return (
    <section className='empty-chat-details flex column align-center justify-center'>
      <NoChatLogo className='empty-chat-logo' />
      <h1>WusApp Web</h1>
      <div className='empty-chat-intro'>You can send messages without keeping the phone connected.</div>
    </section>
  )
}
