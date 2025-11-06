import '../styles/VoteButton.css'
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";

interface VoteButtonProps {
  vote_count: number
  onVote: (direction: "up" | "down") => void
  user_vote: "up" | "down" | null

}
function VoteButton({vote_count, onVote, user_vote}: VoteButtonProps) {
  // console.log("user_vote prop:", user_vote)
  return (
    <div className='Vote'>
        <LuArrowBigUp onClick={() => onVote("up")} className={`vote-icon ${user_vote === "up" ? "active-up" : ""}`}/>
        <span>{vote_count}</span>
        <LuArrowBigDown onClick={() => onVote("down")}className={`vote-icon ${user_vote === "down" ? "active-down" : ""}`}/>
    </div>
  )
}

export default VoteButton