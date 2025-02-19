
import MemoirCard from "./MemoirCard"
import { Memoir, memoir_data } from "./Memoir"
import OpenAItest from "../API_OpenAI/OpenAItest"
import "./Memoir.css"

const memoirs = memoir_data

const MemoirPage = () => {
    return (
    <div>
        <OpenAItest />
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