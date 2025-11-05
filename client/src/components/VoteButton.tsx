import '../styles/VoteButton.css'
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";

interface VoteButtonProps {
  vote_count: number
  onVote: (direction: "up" | "down") => void
}
function VoteButton({vote_count, onVote}: VoteButtonProps) {
  return (
    <div className='Vote'>
        <LuArrowBigUp onClick={()=> onVote("up")} className='vote-icon'/>
        <span>{vote_count}</span>
        <LuArrowBigDown onClick={() => onVote("down")} className="vote-icon"/>
    </div>
  )
}

export default VoteButton