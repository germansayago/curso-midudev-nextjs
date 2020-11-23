import { useState } from "react"
import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"

import { addDevit } from "firebase/client"

export default function ComposeTweet() {
  const user = useUser()
  // useUser()
  const [message, setMessage] = useState("")

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
  }

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            name=""
            value={message}
            placeholder="¿Que esta pasando?"
          ></textarea>
          <div>
            <Button
              disabled={message.length === 0}
              className="btn-login-github"
            >
              Devitear
            </Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          border: 0px;
          padding: 15px;
          font-size: 16px;
          width: 100%;
          resize: none;
          min-height: 200px;
        }
      `}</style>
    </>
  )
}
