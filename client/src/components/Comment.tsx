import '../styles/Comment.css'
import { LuArrowBigUp } from "react-icons/lu";
import { LuArrowBigDown } from "react-icons/lu";
import { CommentData } from '../types';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { useState } from 'react';

interface CommentProps{
  comment:CommentData
}

function Comment({comment}: CommentProps) {
  const {isAuthenticated} = useAuth()
  const {openModal} = useModal()

  const [userVote, setUserVote] = useState<"up" | "down" | null>(comment.user_vote?? null);
  const [voteCount, setVoteCount] = useState<number>(comment.vote_count)

  async function handleVote(voteType: "up" | "down"){
    if(!isAuthenticated){
      openModal("signup")
      return;
    }

    const is_upvote = voteType === "up";

    try {
      const res = await fetch(`http://127.0.0.1:5000/comment_vote/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          comment_id: comment.id,
          is_upvote
        })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message)
        return;
      }

      if (userVote === voteType){
        setUserVote(null);
        setVoteCount((prev) => prev + (voteType === "up" ? -1: 1))
      } else {
        const voteChange =
          userVote === null
            ? voteType === "up"
              ? 1
              : -1
            : voteType === "up"
              ? 2
              : -2;
        setVoteCount((prev) => prev + voteChange)
        setUserVote(voteType);
      }

      console.log("Comment vote success:", data);
    } catch(err) {
      console.log("Comment vote error:", err);
    }
  }

  return (
    <div className='Comment'> 
      <div className='Comment_Header'>
        <img src={comment.user_avatar} alt={`r/${comment.user_name} avatar`}/>
        <span className='Comment_Username'>{comment.user_name}</span>
        <span className='Comment_Dot'> • </span>
        <span className='Comment_Time'>{comment.time}</span>
      </div>
      <div className='Comment_Text'>
        <p>
         {comment.content}
        </p>
      </div>
      <div className='Comment_Interactions'>
        <LuArrowBigUp
          className={`vote-icon ${userVote === "up" ? "active-up": ""}`}
          onClick={() => handleVote("up")}
        />
            {voteCount}
        <LuArrowBigDown
          className={`vote-icon ${userVote ==="down" ? "active-down": ""}`}
          onClick={() => handleVote("down")}
        />
      </div>
    </div>
  )
}

export default Comment