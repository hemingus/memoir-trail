
import MemoirCard from "./MemoirCard"
import { Memoir, memoir_data } from "./Memoir"
import { useState } from "react"
import OpenAItest from "../API_OpenAI/OpenAItest"
import "./Memoir.css"
import "./MemoirPage.css"
import CreateMemoir from "./CreateMemoir"

const memos = memoir_data

const MemoirPage = () => {
    const [memoirs, setMemoirs] = useState<Memoir[]>([memos[0]])

    const addMemoir = (memoir: Memoir) => {
        setMemoirs([...memoirs, memoir]);
      };

    return (
    <div className="memoirpage-container">
        <h1 className="memoirPage-header">Memoirs</h1>
        <OpenAItest />
        <CreateMemoir onAdd={addMemoir} />
        <div className="memoirCardContainer">
            {memoirs.map((memoir) => (
                <MemoirCard 
                    key={memoir.id}
                    title={memoir.title} 
                    description={memoir.description} 
                    date={memoir.date ? memoir.date : null}
                />
            ))}
        </div>
    </div>
    )
}

export default MemoirPage