import '../styles/Comment.css'
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { CommentData } from '../types';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { useState } from 'react';

interface CommentProps{
  comment:CommentData
  onCommentUpdated?: (updatedComment: CommentData) => void;
  onCommentDeleted?: (commentId: number) => void;
}

function Comment({comment, onCommentUpdated, onCommentDeleted}: CommentProps) {
  const API = import.meta.env.VITE_API_BASE_URL
  const {isAuthenticated, user} = useAuth()
  const {openModal} = useModal()

  const [userVote, setUserVote] = useState<"up" | "down" | null>(comment.user_vote?? null);
  const [voteCount, setVoteCount] = useState<number>(comment.vote_count)
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const isUserComment = user?.username === comment.user_name

  async function handleVote(voteType: "up" | "down"){
    if(!isAuthenticated){
      openModal("signup")
      return;
    }

    const is_upvote = voteType === "up";
    try {
      const res = await fetch(`${API}/comment_vote/create`, {
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

  async function handleSaveEdit(){
    try {
      const res = await fetch(`${API}/comment/edit/${comment.id}`,{
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({text: editText}),
      });
      const data = await res.json();
      if(!res.ok) {
        console.error(data.message);
        return
      }
      setIsEditing(false);
      onCommentUpdated?.(data);
    } catch(err) {
      console.error("Edit comment error:", err);
    }
  }

  async function handleDelete(){
    if(!window.confirm("Are you sure want to delete this comment?")) return;
    try {
      const res = await fetch(`${API}/comment/delete/${comment.id}`,{
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        console.error(data.message);
        return;
      }
      onCommentDeleted?.(comment.id);
    } catch (err) {
      console.error("Delete comment error:", err);
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
        {isEditing ? (
          <div className='Comment_EditBox'>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
            />
            <div className='Comment_EditButtons'>
              <button onClick={()=> setIsEditing(false)}>Cancel</button>
              <button onClick={handleSaveEdit}>Save</button>
            </div>
          </div>
        ) : (
          <p>{comment.content}</p>
        )}
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
        {isUserComment && (
          <div className='Comment_MenuWrapper'>
            <HiOutlineDotsHorizontal
              className='Comment_MenuIcon'
              onClick={()=> setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className='Comment_Menu'>
                <button onClick={()=> setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment