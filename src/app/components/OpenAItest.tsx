"use client"

import OpenAI from "openai";
import { useState, useEffect} from 'react'

const OpenAItest = () => {
    const [apiText, setApiText] = useState<string>("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("OPENAI_API_KEY: ", process.env.NEXT_PUBLIC_OPENAI_API_KEY)
        const fetchCompletion = async () => {
            const openai = new OpenAI({
              apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,

              dangerouslyAllowBrowser: true, // Required for frontend usage
            });
      
            try {
              const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: "Write a haiku about AI" }],
              });
      
              setApiText(completion.choices[0].message.content || "No response received.");
            } catch (error) {
              console.error("Error fetching data:", error);
              setApiText("Failed to fetch response.");
            }
            setLoading(false)
          };
      
          fetchCompletion();
    }, [])
    return (
        <div>
            <h3>API response:</h3>
            <p>{loading ? "loading..." : apiText}</p>
        </div>
      )
}

export default OpenAItest

