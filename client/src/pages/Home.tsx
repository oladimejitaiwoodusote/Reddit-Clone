import '../styles/Home.css'
import PostPreview from '../components/PostPreview'
import { PostData } from '../types';
import { useEffect, useState } from 'react';

function Home() {
  
  const [posts, setPosts] = useState<PostData[]>([])

  useEffect(() => {
    fetch(`http://127.0.0.1:5000//post/all`)
    .then(response => response.json())
    .then(data => setPosts(data))
  }, [])
  
  return (
    <div className="Home">

      <div className='Home_Post_Previews'>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} className='PostPreview_Home'/>
        ))}
      </div>
    </div>
  )
}

export default Home