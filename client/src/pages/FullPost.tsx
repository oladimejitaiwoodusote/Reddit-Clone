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
  // const [comments, setComments] = useState<CommentData[]>([])

  useEffect(() => {
    fetch(`http://127.0.0.1:5000//post/${id}`)
    .then(response => response.json())
    .then(data => setPost(data))
  }, [id])

  useEffect(() => {
    console.log(post)
  },[post])

  const dummyComments: CommentData[] = [
    {
      id: 1,
      user_name: "TechNerd99",
      user_avatar: "https://ui-avatars.com/api/?name=TechNerd99",
      content: "Great explanation! Helped me finally understand the concept.",
      vote_count: 15,
      time: 2,
    },
    {
      id: 2,
      user_name: "CodeWizard",
      user_avatar: "https://ui-avatars.com/api/?name=CodeWizard",
      content: "I think there's a typo in the second example, check again.",
      vote_count: 4,
      time: 5,
    },
    {
      id: 3,
      user_name: "CuriousCat",
      user_avatar: "https://ui-avatars.com/api/?name=CuriousCat",
      content: "Can someone explain why this works the way it does?",
      vote_count: 3,
      time: 1,
    },
    {
      id: 4,
      user_name: "DevDan",
      user_avatar: "https://ui-avatars.com/api/?name=DevDan",
      content: "Been stuck on this for days. Thanks for the clarity!",
      vote_count: 11,
      time: 3,
    },
    {
      id: 5,
      user_name: "FrontendFan",
      user_avatar: "https://ui-avatars.com/api/?name=FrontendFan",
      content: "Nice write-up. Would love a follow-up on performance tips.",
      vote_count: 9,
      time: 7,
    },
    {
      id: 6,
      user_name: "AlgoQueen",
      user_avatar: "https://ui-avatars.com/api/?name=AlgoQueen",
      content: "This is similar to something I saw in an interview question.",
      vote_count: 5,
      time: 4,
    },
    {
      id: 7,
      user_name: "NullPointer",
      user_avatar: "https://ui-avatars.com/api/?name=NullPointer",
      content: "Clean code is underrated. Good job!",
      vote_count: 12,
      time: 6,
    },
    {
      id: 8,
      user_name: "SyntaxSam",
      user_avatar: "https://ui-avatars.com/api/?name=SyntaxSam",
      content: "What would be the best way to refactor this?",
      vote_count: 2,
      time: 8,
    },
    {
      id: 9,
      user_name: "AIOverlord",
      user_avatar: "https://ui-avatars.com/api/?name=AIOverlord",
      content: "This could be automated with a script. Anyone tried?",
      vote_count: 6,
      time: 9,
    },
    {
      id: 10,
      user_name: "JustLearning",
      user_avatar: "https://ui-avatars.com/api/?name=JustLearning",
      content: "Thanks for sharing. New to this and it really helped.",
      vote_count: 8,
      time: 10,
    }
  ];
  
  

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
        {dummyComments.map((comment) => (
          <Comment comment={comment}/>
        ))}
      </div>

    </div>
  )
}

export default FullPost