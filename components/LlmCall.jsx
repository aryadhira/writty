'use server'
import OpenAI from "openai";

const CallLLm = async(context) => {
    console.log('context', context)
    const openai = new OpenAI({baseURL:process.env.NEXT_PUBLIC_LLM_URL,apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser:true});
    
    const result = await openai.chat.completions.create({
        model: process.env.NEXT_PUBLIC_LLM_MODEL,
        messages: context,
        store: true,
    });

    return result.choices[0].message.content
}

export default CallLLm;