import { useParams } from 'react-router-dom'
import '../styles/Subreddit.css'
import { SubredditData } from '../types'
import { useEffect, useState } from 'react'

function Subreddit() {
  const {name} = useParams()
  const [subreddit, setSubreddit] = useState<SubredditData|null>(null);

  useEffect(()=> {
    fetch(`http://127.0.0.1:5000//subreddit/r/${name}`)
    .then(response => response.json())
    .then(data => setSubreddit(data))
  },[name])

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
              <span>{subreddit.name}</span>
            </div>
            <div className='Subreddit_Header_Interactions'>
              <button>+ Create Post</button>
              <button>Join</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Subreddit