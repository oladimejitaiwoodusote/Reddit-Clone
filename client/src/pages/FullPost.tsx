import '../styles/FullPost.css'
import { Post } from '../components/PostPreview'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Vote from '../components/Vote'
import Comment from '../components/Comment'

function FullPost() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000//post/${id}`)
    .then(response => response.json())
    .then(data => setPost(data))
  }, [id])

  useEffect(() => {
    console.log(post)
  },[post])

  if (!post) return <p>Loading...</p>
  return (
    <div className='FullPost'>
      <div className='FullPost_Header'> 
        <img src={post.subreddit_avatar} alt={`r/${post.subreddit_name} avatar`}/>
        <div className="FullPost_Meta">
          <div className='FullPost_Meta_Top'>
            <span className='FullPost_Subreddit'>r/{post.subreddit_name}</span>
            <span className='FullPost_Dot'> • </span>
            <p className='FullPost_Time'>{post.time} hr. ago</p>
          </div>
          <span className='FullPost_Subreddit'>{post.user_name}</span>
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
        <Vote vote_count={post.vote_count}/>
        <Comment comment_count={post.comment_count}/>
      </div>

    </div>
  )
}

export default FullPost