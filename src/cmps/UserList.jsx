import { UserPreview } from './UserPreview'

export function UserList({ users, onStartNewChat }) {
  return (
    <section className='user-list'>
      {users.map(user => <UserPreview key={user._id} user={user} onStartNewChat={onStartNewChat} />)}
    </section>
  )
}
