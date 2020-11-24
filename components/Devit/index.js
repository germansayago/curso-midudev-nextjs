import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"

export default function Devit({
  avatar,
  userName,
  content,
  createdAt,
  img,
  id,
}) {
  const timeago = useTimeAgo(createdAt)
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong> <span> · </span> <date>{timeago}</date>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 2px solid #eaf7ff;
          display: flex;
          padding: 10px 15px;
        }
        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        img {
          width: 100%;
          height: auto;
          margin-top: 10px;
          border-radius: 10px;
        }
        date {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
