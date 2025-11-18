import { useParams, useNavigate } from 'react-router-dom'
import '../styles/Subreddit.css'
import { SubredditData, PostData } from '../types'
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import PostPreview from '../components/PostPreview';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';

function Subreddit() {
  const {subreddit_name} = useParams()
  const [subreddit, setSubreddit] = useState<SubredditData|null>(null);
  const [posts, setPosts] = useState<PostData[]>([])
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  
  
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()
  const {openModal} = useModal()

  useEffect(()=> {
    fetch(`http://127.0.0.1:5000/subreddit/r/${subreddit_name}`)
    .then(response => response.json())
    .then(data => setSubreddit(data))
  },[subreddit_name])

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/subreddit/r/${subreddit_name}/posts`)
    .then(response => response.json())
    .then(data => setPosts(data))
  }, [subreddit_name])

  useEffect(() => {
    if (!isAuthenticated || !subreddit) {
      return
    }

    async function fetchSubscription() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/subscription/check/${subreddit!.id}`, {
          credentials: "include"
        })

        const data = await res.json();
        setIsSubscribed(data.subscribed);
        setSubscriptionId(data.subscription_id);
      } catch(err) {
        console.error("Subscription fetch error:", err);
      }
    }

    fetchSubscription()
  }, [isAuthenticated, subreddit])

  function handleCreateClick(){
    if (isAuthenticated){
      navigate(`/submit`)
    } 
    else {
      openModal("login")
    }
  }

  async function handleJoinClick() {
    if (!isAuthenticated) {
      openModal("signup");
      return;
    }

    try {
      if(!isSubscribed) {
        const res = await fetch(`http://127.0.0.1:5000/subscription/create`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          credentials: "include",
          body: JSON.stringify({subreddit_id: subreddit?.id})
        });

        const data = await res.json();

        if (res.ok) {
          setIsSubscribed(true);
          setSubscriptionId(data.id);
        } else {
          console.error(data.message)
        }
      } else if (subscriptionId) {
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
      console.error("Join toggle error:", err);
    }
  }
  
  if (!subreddit) return <p>Loading...</p>
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