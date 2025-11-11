import '../styles/Comment.css'
import { LuArrowBigUp } from "react-icons/lu";
import { LuArrowBigDown } from "react-icons/lu";
import { CommentData } from '../types';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { useState, useEffect } from 'react';

interface CommentProps{
  comment:CommentData
}

function Comment({comment}: CommentProps) {
  const {isAuthenticated} = useAuth()
  const {openModal} = useModal()

  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [voteCount, setVoteCount] = useState<number>(0)

  useEffect(() => {
    setVoteCount(comment.vote_count)

    if (isAuthenticated) {
      fetch(`http://127.0.0.1:5000/comment_vote/get/${comment.id}`, {
        credentials: "include",
      })
      .then((res) => {
        if(!res.ok) {
          return null;
        }
        return res.json()
      })
      .then((data) => {
        if (data && data.is_upvote !== undefined) {
          setUserVote(data.is_upvote ? "up" : "down")
        }
      })
      .catch((err) => console.error("Error fetching comment vote:", err));
    }
  }, [isAuthenticated, comment.id, comment.vote_count])

  function handleVote(voteType: "up" | "down"){
    if(!isAuthenticated){
      openModal("signup")
      return
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
            {comment.vote_count}
        <LuArrowBigDown
          className={`vote-icon ${userVote ==="down" ? "active-down": ""}`}
          onClick={() => handleVote("down")}
        />
      </div>
    </div>
  )
}

export default Comment