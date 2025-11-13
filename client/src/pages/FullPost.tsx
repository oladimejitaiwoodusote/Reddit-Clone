import '../styles/FullPost.css'
import { PostData } from '../types'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import VoteButton from '../components/VoteButton'
import CommentButton from '../components/CommentButton'
import Comment from '../components/Comment'
import { CommentData } from '../types'
import { useModal } from '../context/ModalContext'
import { useAuth } from '../context/AuthContext'

function FullPost() {
  const { id } = useParams()
  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([])
  const [commentText, setCommentText] = useState("")
  const [isCommenting, setIsCommenting] = useState(false)
  const {openModal} = useModal()
  const {isAuthenticated} = useAuth()
  const [voteCount, setVoteCount] = useState<number>(0);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  
  useEffect(() => {
    fetch(`http://127.0.0.1:5000//post/${id}`,{
      credentials: "include",
    })
    .then(response => response.json())
    .then(data => {
      setPost(data)
      setVoteCount(data.vote_count);
      setUserVote(data.user_vote)
    })
    .catch(err => console.error("Error fetching post:", err))
  }, [id]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000//post/comments/${id}`,{
      credentials: "include",
    })
    .then(response => response.json())
    .then(data => setComments(data)) 
    .catch(err => console.error("Error fetching comments:", err))
  },[id])

  async function handleVoteClick (direction: "up" | "down"){
    if(!isAuthenticated) {
        openModal("signup")
        return;
    }
    //logic for handling vote action goes here
    const is_upvote = direction === "up";

    try {
      const res = await fetch(`http://127.0.0.1:5000//post_vote/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            post_id : post?.id,
            is_upvote
        }) 
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }

      if (userVote == direction) {
        setUserVote(null)
        setVoteCount(prev => prev + (direction ==="up" ? -1: 1))
      } else {
        const voteChange =
          userVote === null
            ? direction === "up"
              ? 1
              : -1
            : direction === "up"
              ? 2
              : -2
        setVoteCount(prev => prev + voteChange)
        setUserVote(direction)
      }

      console.log("Vote success: ", data);
    } catch (err) {
      console.error("Vote error:", err);
    }
  }

  function handleCommentClick () {
    if(!isAuthenticated) {
        openModal("signup");
        return;
    }

    setIsCommenting(true)

    //logic for commenting on FullPost
    console.log("commented!");
  }

  function handleCancel() {
    setIsCommenting(false)
    setCommentText("")
  }

  async function handleSubmit(){
    if(!commentText.trim()){
      return
    }
    console.log("Submitting comment:", commentText)
    //logic for submitting content to backend
    try {
      const res = await fetch(`http://127.0.0.1:5000/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:"include",
        body: JSON.stringify({
          post_id: post?.id,
          text: commentText
        })
      });
      const data = await res.json()
      if (!res.ok) {
        console.error(data.message);
        return
      }
      setComments((prev) => [data, ...prev])
      setCommentText("");
      setIsCommenting(false);
    } catch (err) {
      console.error("Comment error:", err);
    }
  }

  if (!post) return <p>Loading...</p>
  return (
    <div className='FullPost'>
      <div className='FullPost_Header'> 
        <img src={post.subreddit_avatar} alt={`r/${post.subreddit_name} avatar`}/>
        <div className="FullPost_Meta">
          <div className='FullPost_Meta_Top'>
            <Link to={`/subreddit/r/${post.subreddit_name}`} className="SubredditPreviewLink">            
              <span className='FullPost_Subreddit'>r/{post.subreddit_name}</span>
            </Link>
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
        <VoteButton vote_count={voteCount} onVote={handleVoteClick} user_vote={userVote}/>
        <div onClick={() => handleCommentClick()}>
          <CommentButton comment_count={post.comment_count}/>
        </div>
      </div>

      <div className='FullPost_CommentInput'>
        {!isCommenting ? (
          <input
            type="text"
            placeholder='Share your thoughts'
            onFocus={handleCommentClick}
            readOnly
          />
        ) : (
          <div className='FullPost_CommentBox'>
            <textarea
              placeholder='Share your thoughts'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
            />
            <div className='FullPost_CommentBox_Buttons'>
              <button className='FullPost_CancelButton' onClick={handleCancel}>
                cancel
              </button>
              <button className='FullPost_CommentButton' onClick={handleSubmit}>
                Comment
              </button>
            </div>
          </div>
        )}
      </div>

      <div className='FullPost_CommentSection'>
        {comments.map((comment) => (
            <Comment 
              key={comment.id} 
              comment={comment}
              onCommentUpdated={(updated) =>
                setComments((prev) => 
                  prev.map((c)=> (c.id === updated.id ? updated : c))
                )
              }
              onCommentDeleted={(id) =>
                  setComments((prev) => prev.filter((c) => c.id !== id))
              }
              />
        ))}
      </div>

    </div>
  )
}

export default FullPost