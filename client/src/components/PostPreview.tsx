import '../styles/PostPreview.css'
import VoteButton from './VoteButton'
import CommentButton from './CommentButton'
import { Link } from 'react-router-dom'
import { PostData } from '../types'
import { useModal } from '../context/ModalContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

interface PostPreviewProps{
    post:PostData
}

function PostPreview({post}: PostPreviewProps) {
    const {openModal} = useModal();
    const {isAuthenticated} = useAuth();
    const [vote_count, setVoteCount] = useState(post.vote_count)
    const [userVote, setUserVote] = useState<"up" | "down" | null>(post.user_vote)

    function handleJoinClick () {
        if(!isAuthenticated) {
            openModal("signup");
            return;
        }

        //logic for joining subreddit to be added here
        console.log("Joined subreddit!");
    }

    async function handleVoteClick (direction: "up" | "down"){
        if(!isAuthenticated) {
            openModal("signup")
            return;
        }
        
        //logic for handling vote action goes here
        const is_upvote = direction === "up"

        try {
            const res = await fetch(`http://127.0.0.1:5000//post_vote/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    post_id : post.id,
                    is_upvote
                })
            })

            const data = await res.json()
            if(!res.ok) {
                console.error(data.message)
                return
            }

            console.log("Vote success:", data)
        } catch (err) {
            console.error("Vote error:", err)
        }
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
            <VoteButton vote_count={vote_count} onVote={handleVoteClick} user_vote={userVote}/>
            <Link to={`/subreddit/r/${post.subreddit_name}/post/${post.id}`}>
                <CommentButton comment_count={post.comment_count}/>
            </Link>
        </div>
    </div>
  )
}

export default PostPreview