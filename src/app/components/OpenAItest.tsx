"use client"

import OpenAI from "openai";
import { useState, useEffect} from 'react'

const OpenAItest = () => {
    const [apiText, setApiText] = useState<string>("Waiting for input...")
    const [loading, setLoading] = useState(false)
    const [word, setWord] = useState<string>("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord(event.target.value);
    }

    const fetchCompletion = async () => {
        const openai = new OpenAI({
          apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,

          dangerouslyAllowBrowser: true, // Required for frontend usage
        });
  
        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: `${word} (respond like a overexcited teenage girl in max 50 words)` }],
          });
  
          setApiText(completion.choices[0].message.content || "No response received.");
        } catch (error) {
          console.error("Error fetching data:", error);
          setApiText("Failed to fetch response.");
        }
        setLoading(false)
      };
  
    return (
        <div>
            <input
            type="text"
            onChange={handleInputChange}
            value={word}
            placeholder="input text..."
            />
            {loading ? <h3>Loading...</h3> : <button onClick={fetchCompletion}>Submit</button>}
            <h3>API response:</h3>
            <p>{loading ? "loading..." : apiText}</p>
        </div>
      )
}

export default OpenAItest

