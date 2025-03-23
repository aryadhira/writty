"use client"
import React, { useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { useState, useRef } from "react";
import OpenAI from "openai";
import Image from "next/image";

const Home = () => {
  const [messages, setMessages] = useState([]);
  // const [inputMessage, setInputMessage] = useState('');
  const inputMessage = useRef(null)
  const responseRef = useRef(null)
  const openai = new OpenAI({baseURL:process.env.NEXT_PUBLIC_LLM_URL,apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser:true});
  const sysMessage = "your main goals is helping user to write any content for ¸ linkedin post, youtube video script, cover letter, etc..."
  const [context, setContext] = useState([{ role: "system", content: sysMessage }]);
  const scrollableContainerRef = useRef(null);

  const handleSubmit = (e) => {
      e.preventDefault();

      const inputVal = inputMessage.current.value
      const newMessage ={
          content: inputVal,
          sender: 'user'
      }
      
      setMessages(prev => [...prev, newMessage])
      
      setContext(prev => [...prev, { role: "user", content: inputVal }])
      // setInputMessage('')
      inputMessage.current.value = ''
      callLLm();
      
  }

  useEffect(()=>{
    console.log('Updated context:', context);
  },[context])

  const callLLm = async() => {
    const completion = await openai.chat.completions.create({
        model: process.env.NEXT_PUBLIC_LLM_MODEL,
        messages: context,
        store: true,
    });

    const botMessage ={
        content: completion.choices[0].message.content,
        sender: 'bot'
    }

    setContext(prev => [...prev,{role:"assistant", content: completion.choices[0].message.content}])
    setMessages(prev => [...prev, botMessage])

    console.log(context)
  }

  useEffect(() => {
    if (scrollableContainerRef.current) {
      const container = scrollableContainerRef.current;
      const lastChild = container.lastElementChild;
      if (lastChild) {
        lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  }, [messages])


  return (
    <div className=" flex items-center flex-col gap-3 justify-center">
      {/* header */}
      <div className="flex pt-10 justify-center">
          <Image src="/logo.png" height={150} width={300} alt="logo"/>
      </div>
      {/* end of header */}

      {/* chat container */}
      <div className="flex justify-center rounded-2xl h-[700px] sm:w-3/4 md:3/4 lg:w-1/2 scroll-smooth">
        <div className="flex-col overflow-y-auto h-full w-full" ref={scrollableContainerRef}>
          {messages.map((message, index)=>(
              <div key={index} ref={responseRef} className={`flex ${message.sender === 'user'? 'justify-end': 'justify-start'} p-5`}>
                  <div className={`max-w-[80%] p-5 ${message.sender === 'user'? 'bg-fourth': 'bg-third'}  text-secondary rounded-xl`}>
                      <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                  </div>
              </div>
          ))}
        </div>
      </div>
      {/* end of chat container */}

      {/* prompt input */}
      <div className="flex gap-3 items-center justify-center  mt-16 h-[100px] sm:w-3/4 md:3/4 lg:w-1/2">
          <textarea 
          ref={inputMessage}
          className="h-3/4 w-full p-5 bg-secondary rounded-xl" placeholder="what content you want to write?"
          />
          <button
          onClick={handleSubmit}
          className="bg-third w-1/6 h-3/4 rounded-lg hover:bg-fourth hover:text-secondary transition-all"
          >
            <h3 className="text-lg tracking-wider">Write</h3>
          </button>
      </div>
      {/*  */}
    </div>
      
      
  );
}

export default Home;
