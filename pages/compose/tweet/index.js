import { useState } from "react"
import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"

export default function ComposeTweet() {
  // const user = useUser()
  useUser()
  const [message, setMessage] = useState("")

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
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
          font-size: 12px;
          width: 100%;
          resize: none;
          min-height: 200px;
        }
      `}</style>
    </>
  )
}
