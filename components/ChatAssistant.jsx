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
    const context = useRef([
        {
            role: 'system',
            content: sysMessage,
        }
    ])
    const scrollableContainerRef = useRef(null)
    const isLoading = useRef(false);

    const onSubmit = async () => {
        const messageObj = {
            sender : 'user',
            content : inputMessage.current.value
        }

       setMessage(pre => [...pre, messageObj])
       context.current.push({role: 'user', content: inputMessage.current.value})
       
       inputMessage.current.value = ''
       
       isLoading.current = true
       const response = await LlmCall(context.current)
       
       
       
       if (response != ''){
        const botMessage = {
            content: response,
            sender: 'bot'
       }
        isLoading.current = false
        setMessage(pre => [...pre, botMessage])
        context.current.push({role: 'assistant', content: response})
        
       }else{
        console.log('recalling...')
         const resp = await LlmCall(context.current)
         const botMessage = {
            content: resp,
            sender: 'bot'
        }
            isLoading.current = false
            setMessage(pre => [...pre, botMessage])
            context.current.push({role: 'assistant', content: resp})
       }
       
    }

    const copyToClipboard = async (content) => {
        try {
            await navigator.clipboard.writeText(content);
            alert('Message copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy message:', error);
            alert('Failed to copy message. Please try again.');
        }
    };


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
        <div>
            <div className="flex flex-col items-center h-screen">          
                {/* chat content */}
                <div className="flex-1 w-full md:w-[850px] overflow-y-auto p-4 pt-24 pb-44 space-y-10 hide-scrollbar">
                    {messages.map((message, index)=>(
                        <div 
                        ref={scrollableContainerRef}
                        key={index} 
                        className={`flex ${message.sender === 'user'? 'justify-end': 'justify-center'} p-2`}
                        >
                            <div className={
                                `${message.sender === 'user'? 'max-w-[80%]': 'w-[100%]'} 
                                 p-2 ${message.sender === 'user'? 'bg-secondary': ''} 
                               text-fourth rounded-xl`}
                            >
                                {message.sender != 'user' && (
                                    <div className="flex justify-end">
                                        <button 
                                            onClick={() => copyToClipboard(message.content)}
                                        >
                                            <span><Icons.clipBoard/></span>
                                        </button>
                                    </div>
                                )}
                                <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                            </div>
                        </div>
                    ))}
                    {isLoading.current && <Loader/>}
                </div>
                
                {/* Input */}
                <div className="fixed bottom-0 w-full flex items-end py-5 bg-[#0e0e0f]">
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
        </div>
    )
}

export default ChatAssistant;