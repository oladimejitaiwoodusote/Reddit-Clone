import { useParams } from 'react-router-dom'
import '../styles/Subreddit.css'
import { SubredditData, PostData } from '../types'
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import PostPreview from '../components/PostPreview';


function Subreddit() {
  const {subreddit_name} = useParams()
  const [subreddit, setSubreddit] = useState<SubredditData|null>(null);

  const dummyPosts: PostData[] = [
    {
      id: 1,
      subreddit_name: "javascript",
      subreddit_avatar: "https://cdn.iconscout.com/icon/free/png-256/javascript-1-225993.png",
      user_name: "dev_guru",
      title: "What are the new features in ES2025?",
      content: "Has anyone explored the Record & Tuple proposal or other upcoming ES2025 features?",
      media: "",
      vote_count: 128,
      comment_count: 34,
      time: "5 hours ago"
    },
    {
      id: 2,
      subreddit_name: "javascript",
      subreddit_avatar: "https://cdn.iconscout.com/icon/free/png-256/javascript-1-225993.png",
      user_name: "frontend_fan",
      title: "How do you manage deeply nested state in React?",
      content: "",
      media: "https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png",
      vote_count: 452,
      comment_count: 76,
      time: "1 day ago"
    },
    {
      id: 3,
      subreddit_name: "javascript",
      subreddit_avatar: "https://cdn.iconscout.com/icon/free/png-256/javascript-1-225993.png",
      user_name: "bundle_slayer",
      title: "Tips for optimizing large React apps?",
      content: "Looking for advice on React.memo, dynamic imports, and render performance tricks.",
      media: "",
      vote_count: 342,
      comment_count: 58,
      time: "3 days ago"
    },
    {
      id: 4,
      subreddit_name: "javascript",
      subreddit_avatar: "https://cdn.iconscout.com/icon/free/png-256/javascript-1-225993.png",
      user_name: "vanillaking",
      title: "Is it worth learning Vanilla JS deeply in 2025?",
      content: "With all these frameworks, is there still a strong case for mastering Vanilla JS?",
      media: "https://upload.wikimedia.org/wikipedia/en/4/4b/My_Bloody_Valentine_-_Loveless.png",
      vote_count: 210,
      comment_count: 41,
      time: "2 days ago"
    }
  ]

  useEffect(()=> {
    fetch(`http://127.0.0.1:5000//subreddit/r/${subreddit_name}`)
    .then(response => response.json())
    .then(data => setSubreddit(data))
  },[subreddit_name])

  useEffect(() => {
    console.log(subreddit)
  })
  
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
              <button>
                <AiOutlinePlus/>
                Create Post
              </button>
              <button>Join</button>
            </div>
          </div>
        </div>
        <div className='Subreddit_Main'>
          <div className='Subreddit_Post_Previews'>
            {
              dummyPosts.map((post) => (
                <PostPreview key={post.id} post={post} className='PostPreview_Subreddit'/>
              ))
            }
          </div>
          <div className='Subreddit_Description'>
             <span>{subreddit.name}</span>
             <p>
                {subreddit.description}
             </p>
             <div className='Subreddit_Subscribers'>
               <span>34</span>
               <span>Subscribers</span>
             </div>
          </div>
        </div>
    </div>
  )
}

export default Subreddit