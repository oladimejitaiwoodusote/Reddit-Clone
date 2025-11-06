import '../styles/Popular.css'
import PostPreview from '../components/PostPreview'
import { PostData } from '../types'
import { useEffect, useState  } from 'react'

function Popular() {

  const [posts, setPosts] = useState<PostData[]>([])

  useEffect(() => {
    fetch(`http://127.0.0.1:5000//post/popular`,{
      method: "GET",
      credentials: "include",
    })
    .then(response => response.json())
    .then(data => setPosts(data))
  },[])

  return (
    <div className='Popular'>
      <div className='Popular_Post_Previews'>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Popular