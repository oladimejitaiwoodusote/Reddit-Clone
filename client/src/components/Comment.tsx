import '../styles/Comment.css'

export interface CommentData {
  id: number;
  user_name: string;
  user_avatar: string;
  time: number;
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
        <span className='Comment_Time'>{comment.time} hrs ago</span>
      </div>
      <div className='Comment_Text'>
        {comment.content}
      </div>
      <div className='Comment_Interactions'>

      </div>
    </div>
  )
}

export default Comment