import { useEffect, useState } from "react"
import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import Head from "next/head"

import { addDevit, uploadImage } from "firebase/client"
import { useRouter } from "next/router"
import Avatar from "components/Avatar"
import Link from "next/link"
import { colors } from "styles/theme"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATE = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  // useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log("onComplete")
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }

      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un Devit / Devter</title>
        </Head>
        <header>
          <h2>Inicio</h2>
        </header>
        <section className="form-container">
          {user && (
            <section className="avatar-container">
              <Avatar src={user.avatar} />
            </section>
          )}
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              name=""
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              value={message}
              placeholder="¿Que esta pasando?"
            ></textarea>
            {imgURL && (
              <section className="remove-img">
                <button onClick={() => setImgURL(null)}>x</button>
                <img src={imgURL} />
              </section>
            )}
            <div>
              <Button disabled={isButtonDisabled} className="btn-login-github">
                Devitear
              </Button>
            </div>
          </form>
        </section>
        <nav>
          <Link href="/home">
            <a>
              <Home stroke="#09f" width="32" height="32" />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Search width="32" height="32" />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Create width="32" height="32" />
            </a>
          </Link>
        </nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }
        div {
          padding: 15px;
        }
        button {
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          font-size: 24px;
          position: absolute;
          border: 0;
          border-radius: 999px;
          height: 36px;
          width: 36px;
          top: 15px;
          right: 15px;
        }
        .form-container {
          display: flex;
          align-items: flex-start;
        }
        .avatar-container {
          padding-top: 20px;
          padding-left: 20px;
        }
        .remove-img {
          position: relative;
        }
        form {
          padding: 10px;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATE.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 0px;
          padding: 15px;
          font-size: 16px;
          width: 100%;
          resize: none;
          min-height: 200px;
        }
        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
          padding: 0px 30px;
        }

        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          justify-content: center;
        }
        nav a:hover {
          background: radial-gradient(#0099ff11 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
