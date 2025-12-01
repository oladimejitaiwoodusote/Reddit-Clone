import { useParams, useNavigate } from 'react-router-dom'
import '../styles/Subreddit.css'
import { SubredditData, PostData } from '../types'
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import PostPreview from '../components/PostPreview';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';

function Subreddit() {
  const API = import.meta.env.VITE_API_BASE_URL
  const {subreddit_name} = useParams()
  const [subreddit, setSubreddit] = useState<SubredditData|null>(null);
  const [posts, setPosts] = useState<PostData[]>([])
    
  const navigate = useNavigate()
  const {isAuthenticated, subscriptions, subscribeTo, unsubscribeFrom} = useAuth()
  const {openModal} = useModal()

  
  useEffect(()=> {
    fetch(`${API}/subreddit/r/${subreddit_name}`)
    .then(response => response.json())
    .then(data => setSubreddit(data))
  },[subreddit_name])
  
  useEffect(() => {
    fetch(`${API}/subreddit/r/${subreddit_name}/posts`)
    .then(response => response.json())
    .then(data => setPosts(data))
  }, [subreddit_name])
  
  if (!subreddit) return <p>Loading ...</p>
  
  const isSubscribed = subscriptions.has(subreddit.id)

async function handleJoinClick() {
  if (!subreddit) {
    return
  }
  if (!isAuthenticated) {
    openModal("signup");
    return;
  }

  if (!isSubscribed) {
    await subscribeTo(subreddit.id);
  } else {
    await unsubscribeFrom(subreddit.id)
  }   
}

function handleCreateClick(){
  if (isAuthenticated){
    navigate(`/submit`)
  } 
  else {
    openModal("login")
  }
}
  return (
    <div className='Subreddit'>
        <div className='Subreddit_Header'>
          <div className='Subreddit_Header_Image'>
            <img src={subreddit.wallpaper} alt={`r/${subreddit.name} avatar`}/>
          </div>
          <div className='Subreddit_Header_Bottom'>
            <div className='Subreddit_Header_Bottom_Info'>
              <img src={subreddit.avatar} alt={`r/${subreddit.name} avatar`}/>
              <span>r/{subreddit.name}</span>
            </div>
            <div className='Subreddit_Header_Interactions'>
              <button onClick={handleCreateClick}>
                <AiOutlinePlus/>
                Create Post
              </button>
              <button onClick={handleJoinClick}>
                {isSubscribed ? "Joined": "Join"}
              </button>
            </div>
          </div>
        </div>
        <div className='Subreddit_Main'>
          <div className='Subreddit_Post_Previews'>
            {
              posts.map((post) => (
                <PostPreview key={post.id} post={post}/>
              ))
            }
          </div>
          <div className='Subreddit_Description'>
             <span>{subreddit.name}</span>
             <p>
                {subreddit.description}
             </p>
             <div className='Subreddit_Subscribers'>
               <span>{subreddit.member_count}</span>
               <span>Subscribers</span>
             </div>
          </div>
        </div>
    </div>
  )
}

export default Subreddit