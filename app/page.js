import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [chatLog, setChatLog] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  constHandleSend = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, {type: 'user', message: inputValue}])

    setInputValue('')

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>CHATGPT</h1>
      <form>
        <input type='text' placeholder='what do you want to know?' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button type='submit'>Send</button>
      </form>
    </main>
  )
}
