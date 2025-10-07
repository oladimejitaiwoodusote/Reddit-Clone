import '../styles/PostPreview.css'
import VoteButton from './VoteButton'
import CommentButton from './CommentButton'
import { Link } from 'react-router-dom'
import { PostData } from '../types'
import { useModal } from '../context/ModalContext'
import { useAuth } from '../context/AuthContext'

interface PostPreviewProps{
    post:PostData
}

function PostPreview({post}: PostPreviewProps) {
    const {openModal} = useModal();
    const {isAuthenticated} = useAuth();

    function handleJoinClick () {
        if(!isAuthenticated) {
            openModal("signup");
            return;
        }

        //logic for joining subreddit to be added here
        console.log("Joined subreddit!");
    }

    function handleVoteClick (){
        if(!isAuthenticated) {
            openModal("signup")
            return;
        }
        
        //logic for handling vote action goes here
    }

  return (
    <div key={post.id} className="PostPreview">
        <div className='PostPreview_Header'>
            <div className="PostPreview_Meta">
                <img src={post.subreddit_avatar} alt={`r/${post.subreddit_name} avatar`}/>
                <Link to={`/subreddit/r/${post.subreddit_name}`} className="SubredditPreviewLink">                
                    <span className='PostPreview_Subreddit_Name'>r/{post.subreddit_name}</span>
                </Link>
                <span className='PostPreview_Dot'> • </span>
                <p className='PostPreview_Time'>{post.time}</p>
            </div>
            <div className='PostPreview_JoinButton'>
                <button type="button" onClick={() => handleJoinClick()}>
                    Join
                </button>
            </div>
        </div>
        <div className='PostPreview_Title'>
            <Link to={`/subreddit/r/${post.subreddit_name}/post/${post.id}`}>
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
            <div onClick={() => handleVoteClick()}>
                <VoteButton vote_count={post.vote_count}/>
            </div>
            <Link to={`/subreddit/r/${post.subreddit_name}/post/${post.id}`}>
                <CommentButton comment_count={post.comment_count}/>
            </Link>
        </div>
    </div>
  )
}

export default PostPreview