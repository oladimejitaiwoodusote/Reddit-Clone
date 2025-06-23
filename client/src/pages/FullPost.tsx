import '../styles/FullPost.css'
import { Post } from '../components/PostPreview'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function FullPost() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000//post/${id}`)
    .then(response => response.json())
    .then(data => setPost(data))
  }, [id])

  if (!post) return <p>Loading...</p>
  return (
    <div className='FullPost'>
      <div className='FullPost_Header'> 
        
      </div>
    </div>
  )
}

export default FullPost