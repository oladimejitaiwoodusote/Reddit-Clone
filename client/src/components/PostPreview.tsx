import '../styles/PostPreview.css'
import VoteButton from './VoteButton'
import CommentButton from './CommentButton'
import { Link } from 'react-router-dom'
import { PostData } from '../types'
import { useModal } from '../context/ModalContext'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'

interface PostPreviewProps{
    post:PostData
}

function PostPreview({post}: PostPreviewProps) {
    const {openModal} = useModal();
    const {isAuthenticated} = useAuth();
    const [vote_count, setVoteCount] = useState(post.vote_count)
    const [userVote, setUserVote] = useState<"up" | "down" | null>(post.user_vote)
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

    useEffect(() => {
        if(!isAuthenticated) {
            return;
        }

        async function fetchSubscription() {
            try {
                const res = await fetch(`http://127.0.0.1:5000/subscription/check/${post.subreddit_id}`, {
                    credentials: "include"
                });
                const data = await res.json();
                setIsSubscribed(data.subscribed);
                setSubscriptionId(data.subscription_id)
            } catch(err) {
                console.error(err);
            }
        }

        fetchSubscription();
    }, [isAuthenticated, post.subreddit_id])
    
    async function handleJoinClick () {
        if(!isAuthenticated) {
            openModal("signup");
            return;
        }
        
        try {
            if (!isSubscribed) {
                const res = await fetch(`http://127.0.0.1:5000/subscription/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({subreddit_id: post.subreddit_id})
                });
                const data = await res.json();
                if (res.ok) {
                    setIsSubscribed(true);
                    setSubscriptionId(data.id);
                } else {
                    console.error(data.message)
                }
            } else if (subscriptionId){
                const res = await fetch(`http://127.0.0.1:5000/subscription/delete/${subscriptionId}`, {
                    method: "DELETE",
                    credentials: "include"
                });
                const data = await res.json();
                if (res.ok) {
                    setIsSubscribed(false);
                    setSubscriptionId(null);
                } else {
                    console.error(data.message)
                }
            }
        } catch (err) {
            console.error(err);
        }
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

            //Handle optimistic UI Change
            if (userVote == direction) {
                //Undo Vote
                setUserVote(null)
                setVoteCount(prev => prev + (direction === "up" ? -1 : 1))
            } else {
                //Change or new vote
                const voteChange = 
                  userVote === null
                    ? (direction === "up" ? 1: -1)
                    : (direction === "up" ? 2: -2) 
                setVoteCount(prev => prev + voteChange)
                setUserVote(direction)
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
                    {isSubscribed? "Joined": "Join"}
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