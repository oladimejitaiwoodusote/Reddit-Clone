import '../styles/Home.css'
import PostPreview, {Post} from '../components/PostPreview'

function Home() {
  const dummyPosts:Post[] = [
    {
      id: 1,
      subreddit_name: "javascript",
      time: 3,
      title: "Understanding Closures in JavaScript",
      content: "Can someone explain closures in plain English? I'm trying to wrap my head around it and still struggling..."
    },
    {
      id: 2,
      subreddit_name: "react",
      time: 5,
      title: "Best practices for React component structure",
      content: "How do you guys structure your folders for scalability? Atomic design? Feature-based? Would love to hear thoughts."
    },
    {
      id: 3,
      subreddit_name: "go",
      time: 2,
      title: "How do you handle errors in Go idiomatically?",
      content: "I'm coming from Python and the verbose error handling in Go feels clunky. What's the Go way to handle this cleanly?"
    },
    {
      id: 4,
      subreddit_name: "python",
      time: 7,
      title: "List comprehension vs map/filter: which do you prefer?",
      content: "Do you prefer Python's list comprehensions or map/filter for readability and performance? Just curious."
    }
  ]
  


  return (
    <div className="Home">
      <img src={'https://pbs.twimg.com/media/DaT9nhjX4AAiKW-.jpg'} alt="nuthing"/>

      <div className='Home_Post_Previews'>
        {dummyPosts.map((post) => (
          <PostPreview key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Home