
export function UserPreview({ user, onStartNewChat }) {

  return (
    <article className="user-preview flex align-center" onClick={() => onStartNewChat(user._id)}>
      <div className="user-img" style={{ backgroundImage: `url(https://robohash.org/${user._id})`, margin: '4px 0' }}></div>
      <div>
        <h1>{user.name}</h1>
        <p className="user-status">{user.status}</p>
      </div>
    </article>
  )
}
