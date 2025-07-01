import '../styles/FullPost.css'
import { Post } from '../components/PostPreview'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import VoteButton from '../components/VoteButton'
import CommentButton from '../components/CommentButton'
import Comment, {CommentData} from '../components/Comment'


function FullPost() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentData[]>([])

  useEffect(() => {
    fetch(`http://127.0.0.1:5000//post/${id}`)
    .then(response => response.json())
    .then(data => setPost(data))
  }, [id])

  useEffect(() => {
    fetch(`http://127.0.0.1:5000//post/comments/${id}`)
    .then(response => response.json())
    .then(data => setComments(data)) 
  },[id])

  if (!post) return <p>Loading...</p>
  return (
    <div className='FullPost'>
      <div className='FullPost_Header'> 
        <img src={post.subreddit_avatar} alt={`r/${post.subreddit_name} avatar`}/>
        <div className="FullPost_Meta">
          <div className='FullPost_Meta_Top'>
            <span className='FullPost_Subreddit'>r/{post.subreddit_name}</span>
            <span className='FullPost_Dot'> • </span>
            <p className='FullPost_Time'>{post.time}</p>
          </div>
          <span className='FullPost_Username'>{post.user_name}</span>
        </div>
      </div>
      <div className='FullPost_Title'>
        <span>{post.title}</span>
      </div>
      <div className='FullPost_Media'>
        <img src={post.media} alt={`r/${post.subreddit_name} avatar`}/>
      </div>
      <div className='FullPost_Content'>
        <p>{post.content}</p>
      </div>
      <div className='FullPost_Interactions'>
        <VoteButton vote_count={post.vote_count}/>
        <CommentButton comment_count={post.comment_count}/>
      </div>
      <div className='FullPost_CommentInput'>
        <input type='text' placeholder='Join the conversation'/>
      </div>
      <div className='FullPost_CommentSection'>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment}/>
        ))}
      </div>

    </div>
  )
}

export default FullPost