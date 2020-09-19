import Link from "next/link"
import { useEffect, useState } from "react"
import AppLayout from "components/AppLayout"
import Devit from "components/Devit"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

  return (
    <>
      <AppLayout>
        <header className="header">
          <h2>Inicio</h2>
          <Link href="/">login</Link>
        </header>
        <section className="section">
          {timeline.map(({ avatar, message, username, id }) => (
            <Devit
              key={id}
              avatar={avatar}
              message={message}
              username={username}
              id={id}
            />
          ))}
        </section>
        <nav className="nav">navbar bootom</nav>
      </AppLayout>
    </>
  )
}
