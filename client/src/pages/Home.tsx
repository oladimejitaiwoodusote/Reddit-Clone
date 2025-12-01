import '../styles/Home.css'
import PostPreview from '../components/PostPreview'
import { PostData } from '../types';
import { useEffect, useState } from 'react';

function Home() {
  const API = import.meta.env.VITE_API_BASE_URL
  const [posts, setPosts] = useState<PostData[]>([])

  useEffect(() => {
    fetch(`${API}//post/home`,{
      method: "GET",
      credentials: "include",
    })
    .then(response => response.json())
    .then(data => setPosts(data))
  }, [])
  
  return (
    <div className="Home">
      <div className='Home_Post_Previews'>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Home