import '../styles/PostPreview.css'
import VoteButton from './VoteButton'
import CommentButton from './CommentButton'
import { Link } from 'react-router-dom'
import { PostData } from '../types'

interface PostPreviewProps{
    post:PostData
}

function PostPreview({post}: PostPreviewProps) {
  return (
    <div key={post.id} className="PostPreview">
        <div className='PostPreview_Header'>
            <div className="PostPreview_Meta">
                <img src={post.subreddit_avatar} alt={`r/${post.subreddit_name} avatar`}/>
                <span className='PostPreview_Subreddit'>r/{post.subreddit_name}</span>
                <span className='PostPreview_Dot'> • </span>
                <p className='PostPreview_Time'>{post.time}</p>
            </div>
            <div className='PostPreview_JoinButton'>
                <button>Join</button>
            </div>
        </div>
        <div className='PostPreview_Title'>
            <Link to={`post/${post.id}`}>
                <span>{post.title}</span>
            </Link>
        </div>
        {post.media && (<div className='PostPreview_Media'>
            <img src={post.media} alt={`r/${post.subreddit_name} avatar`}/>
        </div>)}
        {post.content && (<div className='PostPreview_Content'>
            <p>{post.content}</p>
        </div>)}
        <div className='PostPreview_Interactions'>
            <VoteButton vote_count={post.vote_count}/>
            <Link to={`post/${post.id}`}>
                <CommentButton comment_count={post.comment_count}/>
            </Link>
        </div>
    </div>
  )
}

export default PostPreview