'use client'
import { Icons } from "./Icons";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import LlmCall from "./LlmCall";
import Loader from "./Loader";

const ChatAssistant = () => {
    const inputMessage = useRef(null)
    const [messages,setMessage] = useState([])
    const sysMessage = 'You are helpfull assistant that helping user to write any content on social media.'
    const [context,setContext] = useState([
        {
            role: 'developer',
            content: sysMessage,
        }
    ])
    const scrollableContainerRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        const messageObj = {
            sender : 'user',
            content : inputMessage.current.value
        }

       setMessage(pre => [...pre, messageObj])
       setContext(pre => [...pre, {role: 'user', content: inputMessage.current.value}])

       
       setIsLoading(true)
       const response = await LlmCall(context)
       setIsLoading(false)
       
       
       if (response != ''){
        const botMessage = {
            content: response,
            sender: 'bot'
       }
        setMessage(pre => [...pre, botMessage])
        setContext(pre => [...pre, {role: 'assistant', content: response}])
       }else{
        console.log('recalling...')
         const resp = await LlmCall(context)
         const botMessage = {
            content: resp,
            sender: 'bot'
        }
            setMessage(pre => [...pre, botMessage])
            setContext(pre => [...pre, {role: 'assistant', content: resp}])
       }
       
       inputMessage.current.value = ''
    }


    useEffect(()=>{
        if (scrollableContainerRef.current) {
            const container = scrollableContainerRef.current;
            const lastChild = container.lastElementChild;
            if (lastChild) {
                lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
            }
        }
    },[messages])

    return (
        <div className="flex flex-col items-center h-screen">            
            {/* chat content */}
            <div className="flex-1 w-full md:w-[850px] overflow-y-auto p-4 pt-24 pb-44 hide-scrollbar">
                 {messages.map((message, index)=>(
                    <div 
                    ref={scrollableContainerRef}
                    key={index} 
                    className={`flex ${message.sender === 'user'? 'justify-end': 'justify-center'} p-2`}
                    >
                        <div className={`max-w-[80%] p-2 ${message.sender === 'user'? 'bg-fourth': 'bg-third'} ${message.sender === 'user'? 'text-secondary': 'text-fourth'} rounded-xl`}>
                            <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                        </div>
                    </div>
                ))}
                {isLoading && <Loader />}
            </div>
            
            {/* Input */}
            <div className="fixed bottom-0 w-full flex items-end py-5 bg-[#222831]">
                <div className="bg-secondary rounded-xl mx-auto w-11/12 md:w-[850px] p-5">
                    <div onSubmit={onSubmit} className="flex items-center gap-2 justify-between">
                        <textarea
                            className="w-full bg-secondary p-3 focus:outline-none resize-none"
                            placeholder="what will we write today?"
                            ref={inputMessage}
                        />
                        <button onClick={onSubmit}>
                            <span>< Icons.arrowUp className=" bg-slate-600 p-0.5 rounded-full"/></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ChatAssistant;