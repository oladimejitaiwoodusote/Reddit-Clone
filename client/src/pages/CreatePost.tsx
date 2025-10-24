import '../styles/CreatePost.css'
import { useEffect, useState } from 'react'
import { SubredditData } from '../types'

function CreatePost() {

  const [subreddits, setSubreddits] = useState<SubredditData | null>(null)

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/subreddits/all`)
    .then(res => res.json())
    .then(data => setSubreddits(data))
  }, [])

  useEffect(() => {
    console.log(subreddits)
  })

  return (
    <div className='CreatePost'>
        <div className='CreatePost_Header'>
          <h1>Create post</h1>
        </div>
        <div className='CreatePost_Dropdown'>
            {/* Dropdown Menu of Subreddits, might need to import them*/}
            <select>
                {subreddits.map(subreddit => {
                  return <option value={subreddit.name}>{subreddit.name}</option>
                })}
            </select>
        </div>
        <div className='CreatePost_TitleInput'>
          <input type='text' placeholder='Title*'/>
        </div>
        <div className='CreatePost_MediaDrop'>
            {/*Some field that says "Drag and Drop or upload media" optional*/}
        </div>
        <div className='CreatePost_BodySection'>
            {/*Optional Input field for body text of Post*/}
            <input type='text' placeholder='Body text (optional)'/>
        </div>
        <div className='CreatePost_Buttons'>
          <button type="submit" className='CreatePost_Buttons_Submit'>
             Post
          </button>
          {/*Might need a cancel button or something*/}
        </div>
    </div>
  )
}

export default CreatePost