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

  function handleVoteClick (){
    if(!isAuthenticated) {
        openModal("signup")
        return;
    }
    //logic for handling vote action goes here
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

  function handleSubmit(){
    if (!commentText.trim()){
      return
    }
    console.log("Submitting comment:", commentText)
    //logic for submitting content to backend
    setCommentText("")
    setIsCommenting(false)
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
        <div onClick={() => handleVoteClick()}>
          <VoteButton vote_count={post.vote_count}/>
        </div>
        <div onClick={() => handleCommentClick()}>
          <CommentButton comment_count={post.comment_count}/>
        </div>
      </div>
      {/* <div className='FullPost_CommentInput' >
        {!isAuthenticated ? (
          <input 
          type='text' 
          placeholder='Share your thoughts' 
          onFocus={() => handleCommentClick()}
          />
        ) : (
          <div className='FullPost_CommentBox'>
            <textarea
              placeholder='Share your thoughts'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={isCommenting? 4: 1}
              onFocus={() => setIsCommenting(true)}
            />
            {isCommenting && (
              <div className='FullPost_CommentBox_Buttons'>
                <button className='FullPost_CancelButton' onClick={handleCancel}>
                  Cancel
                </button>
                <button className='FullPost_CommentButton' onClick={handleSubmit} disabled={!commentText.trim()}>
                  Comment
                </button>
              </div>
            )}
          </div>
        )}
      </div> */}
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
          <div onClick={() => handleVoteClick()}>
            <Comment key={comment.id} comment={comment}/>
          </div>
        ))}
      </div>

    </div>
  )
}

export default FullPost