"use client";

import "./Memoir.css"
import { useState, useEffect } from "react"


interface MemoirCardProps {
    title: string,
    description: string,
    date: string | null
}

const MemoirCard: React.FC<MemoirCardProps> = ({title, description, date}) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
          setSynth(window.speechSynthesis);
        }
      }, []);
  
    const speakText = () => {
    if (!synth) return;
    if (synth.speaking) {
        synth.cancel();
    }
  
      const utterance = new SpeechSynthesisUtterance(`${title}. ${date}. ${description}`);
      utterance.lang = "en-US"; // Adjust for other languages
      utterance.rate = 1; // Speed (1 is normal, 0.5 is slow, 2 is fast)
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false); console.log("Finished speaking!");
      
      synth.speak(utterance);
    };
  
    const stopSpeaking = () => {
        if (synth) {
          synth.cancel();
          setIsSpeaking(false);
        }
      };

    return (
        <div className="memoirCard">
            <h2>{title}</h2>
            <h3>{date}</h3>
            <p>{description}</p>
            <button onClick={isSpeaking ? stopSpeaking : speakText}>
                {isSpeaking ? "Stop" : "Play"}
            </button>
        </div>
    )
}

export default MemoirCard