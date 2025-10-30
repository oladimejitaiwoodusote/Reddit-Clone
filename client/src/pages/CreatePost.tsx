import '../styles/CreatePost.css'
import { useEffect, useState, useRef } from 'react'
import { SubredditData } from '../types'
import { useLocation } from 'react-router-dom'
import SubredditPreview from '../components/SubredditPreview'

function CreatePost() {
  const [subreddits, setSubreddits] = useState<SubredditData[]>([])
  const [filteredSubreddits, setFilteredSubreddits] = useState<SubredditData[]>([])
  const [selectedSubreddit, setSelectedSubreddit] = useState<SubredditData | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const preselectedSubredditName = location.state?.subreddit_name

  // Fetch all subreddits
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/subreddits/all`)
      .then(res => res.json())
      .then((data: SubredditData[]) => {
        setSubreddits(data)
        setFilteredSubreddits(data)

        if (preselectedSubredditName) {
          const found = data.find(s => s.name === preselectedSubredditName)
          if (found) setSelectedSubreddit(found)
        }
      })
  }, [preselectedSubredditName])

  // Filter subreddits as user types
  useEffect(() => {
    const filtered = subreddits.filter(sub =>
      sub.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredSubreddits(filtered)
  }, [searchQuery, subreddits])

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setMediaFile(file)
      const url = URL.createObjectURL(file)
      setMediaPreview(url)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      alert("Title is required.")
      return
    }
    if (!selectedSubreddit) {
      alert("Please select a subreddit.")
      return
    }

    console.log({
      subreddit: selectedSubreddit.name,
      title,
      body,
      mediaFile
    })

    // TODO: Send to backend via FormData (for media upload support)
  }

  return (
    <div className='CreatePost'>
      <div className='CreatePost_Header'>
        <h1>Create Post</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Subreddit dropdown */}
        <div className='CreatePost_Dropdown' ref={dropdownRef}>
          <div
            className='Dropdown_Display'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedSubreddit ? (
              <span>r/{selectedSubreddit.name}</span>
            ) : (
              <span>Select a community</span>
            )}
            <span className='Dropdown_Arrow'>▼</span>
          </div>

          {showDropdown && (
            <div className='Dropdown_Menu'>
              <input
                type='text'
                placeholder='Search communities'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className='Dropdown_List'>
                {filteredSubreddits.slice(0, 7).map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubreddit(sub)
                      setShowDropdown(false)
                    }}
                  >
                    <SubredditPreview subreddit={sub} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Title input */}
        <div className='CreatePost_TitleInput'>
          <input
            type='text'
            placeholder='Title *'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Media upload */}
        <div className='CreatePost_MediaDrop'>
          {mediaPreview ? (
            <div className='MediaPreview'>
              {mediaFile?.type.startsWith('video') ? (
                <video src={mediaPreview} controls />
              ) : (
                <img src={mediaPreview} alt='preview' />
              )}
              <button type='button' onClick={() => { setMediaFile(null); setMediaPreview(null); }}>
                Remove
              </button>
            </div>
          ) : (
            <label className='MediaUploadArea'>
              <input
                type='file'
                accept='image/*,video/*'
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div className='UploadPlaceholder'>
                Drag & Drop or Click to Upload (optional)
              </div>
            </label>
          )}
        </div>

        {/* Body text */}
        <div className='CreatePost_BodySection'>
          <textarea
            placeholder='Body (optional)'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        {/* Submit */}
        <div className='CreatePost_Buttons'>
          <button type='submit' className='CreatePost_Buttons_Submit'>
            Post
          </button>
          <button
            type='button'
            className='CreatePost_Buttons_Cancel'
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
