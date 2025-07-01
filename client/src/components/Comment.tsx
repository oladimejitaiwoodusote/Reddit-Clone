import '../styles/Comment.css'
import { LuArrowBigUp } from "react-icons/lu";
import { LuArrowBigDown } from "react-icons/lu";

export interface CommentData {
  id: number;
  user_name: string;
  user_avatar: string;
  time: string;
  content: string;
  vote_count: number;
}

interface CommentProps{
  comment:CommentData
}

function Comment({comment}: CommentProps) {
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
        <LuArrowBigUp/>
            {comment.vote_count}
        <LuArrowBigDown/>
      </div>
    </div>
  )
}

export default Comment