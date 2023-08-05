'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import axios from 'axios';
import LoadingAnimation from "./components/LoadingAnimation";

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [chatLog, setChatLog] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch data here (if needed) or perform other side effects
    // This function will be called after the component has been rendered
    // You can also return a cleanup function if needed
    // For example, if you set up subscriptions, you can clean them up here

    // return () => {
    //   // Cleanup logic here (if needed)
    // }
  }, []);

  const handleSend = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, {type: 'user', message: inputValue}]);

    sendMessage(inputValue)

    setInputValue('');

  }

  const sendMessage = (message) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    };
    const data = {
      model:'gpt-3.5-turbo-16k',
      messages:[{'role':'user', 'content':message}]
    };

    console.log(headers.Authorization)

    setIsLoading(true);

    axios.post(url, data, {headers: headers}).then((response) => {
      console.log(response);
      setChatLog((prevChatLog) => [...prevChatLog, {type: 'bot', message: response.data.choices[0].message.content}]);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })

  }

  return (
    <main className="bg-gray-900">
      <div className="container mx-auto flex flex-col h-screen max-w-[700px]">
        <h1 className="bg-gradient-to-r from-blue-600 to-blue-300 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">AI Chat Bot</h1>
        <div className="flex-grow overflow-scroll p-6">
          <div className="flex flex-col space-y-4">
          {chatLog.map((message, index) => (
            <div key={index} className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}>
              <div className={`${
                message.type === 'user' ? 'bg-blue-500' : 'bg-gray-800'
              } rounded-lg p-4 text-white max-w-sm`}>
              {message.message}
              </div>
            </div>
          ))
          }
          {
            isLoading &&
            <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                  <LoadingAnimation />
                </div>
            </div>
          }
          </div>
        </div>
        <form onSubmit={handleSend} className="flex-none p-6">
          <div className="flex space-x-4">  
            <input type="text" className="flex-grow px-4 py-2 text-white rounded-full focus:outline-none border border-gray-700 bg-gray-800" placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-full px-4 py-2 text-white font-semibold focus:outline-none hover:bg-blue-300 transition-colors duration-300">Send</button>
          </div>
        </form>
      </div>
    </main>
  )
}
