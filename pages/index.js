import { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"

import Avatar from "components/Avatar"
import AppLayout from "components/AppLayout"
import Button from "components/Buttton"
import Github from "components/Icons/GitHub"
import Logo from "components/Icons/Logo"

import { loginWithGitHub, onAuthStateChanged } from "firebase/client"

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Head>
        <title>devter</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <AppLayout>
        <section className="login">
          <Logo className="logo" />
          <h1>Devter</h1>
          <h2>Lorem ipsum dolor sit amet. 👩‍💻</h2>
          {user === null && (
            <Button onClick={handleClick} className="btn-login-github">
              <Github />
              Login with Github
            </Button>
          )}
          {user && user.avatar && (
            <div>
              <Avatar
                alt={user.username}
                src={user.avatar}
                text={user.username}
              />
              <Link className="btn" href="/home">
                home
              </Link>
            </div>
          )}
        </section>
      </AppLayout>
    </>
  )
}
