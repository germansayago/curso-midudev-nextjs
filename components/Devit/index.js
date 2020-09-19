import Avatar from "components/Avatar"

export default function Devit({ avatar, username, message, id }) {
  return (
    <article>
      <Avatar alt={username} src={avatar} />
      <section>
        <strong>{username}</strong>
        <p>{message}</p>
      </section>
    </article>
  )
}
