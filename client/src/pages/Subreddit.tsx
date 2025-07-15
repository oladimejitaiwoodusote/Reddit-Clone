import { useParams } from 'react-router-dom'
import '../styles/Subreddit.css'
import { SubredditData } from '../types'
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";


function Subreddit() {
  const {subreddit_name} = useParams()
  const [subreddit, setSubreddit] = useState<SubredditData|null>(null);

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
    </div>
  )
}

export default Subreddit