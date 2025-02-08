import "./Memoir.css"


interface MemoirCardProps {
    title: string,
    description: string,
    date: string | null
}

const MemoirCard: React.FC<MemoirCardProps> = ({title, description, date}) => {
    return (
        <div className="memoirCard">
            <h2>{title}</h2>
            <h3>{date}</h3>
            <p>{description}</p>
        </div>
    )
}

export default MemoirCard