import '../styles/Home.css'
import PostPreview, {Post} from '../components/PostPreview'
import { useEffect, useState } from 'react';

function Home() {
  
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch(`http://127.0.0.1:5000//post/all`)
    .then(response => response.json())
    .then(data => setPosts(data))
  }, [])

  useEffect(() => {
    console.log(posts)
  },[posts])
  
  return (
    <div className="Home">
      <img src={'https://pbs.twimg.com/media/DaT9nhjX4AAiKW-.jpg'} alt="nuthing"/>

      <div className='Home_Post_Previews'>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Home