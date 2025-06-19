import '../styles/Home.css'
import PostPreview, {Post} from '../components/PostPreview'

function Home() {
  const dummyPosts: Post[] = [
    {
      id: 1,
      subreddit_avatar: "https://ui-avatars.com/api/?name=JS&background=ff9900&color=ffffff&size=64",
      subreddit_name: "javascript",
      time: 3,
      title: "Understanding Closures in JavaScript",
      content: "Closures are one of the most powerful features of JavaScript. In essence, a closure is a function that has access to its own scope, the scope of the outer function, and the global scope...",
      vote_count: 30,
      comment_count: 20
    },
    {
      id: 2,
      subreddit_avatar: "https://ui-avatars.com/api/?name=React&background=61dafb&color=000000&size=64",
      subreddit_name: "react",
      time: 5,
      title: "React Logo Evolution",
      media: "https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png",
      vote_count: 18,
      comment_count: 7
    },
    {
      id: 3,
      subreddit_avatar: "https://ui-avatars.com/api/?name=Go&background=00ADD8&color=ffffff&size=64",
      subreddit_name: "go",
      time: 2,
      title: "How do you handle errors in Go idiomatically?",
      content: "I'm coming from Python and the verbose error handling in Go feels clunky...",
      vote_count: 25,
      comment_count: 15
    },
    {
      id: 4,
      subreddit_avatar: "https://ui-avatars.com/api/?name=Py&background=306998&color=ffffff&size=64",
      subreddit_name: "python",
      time: 7,
      title: "List comprehension vs map/filter: which do you prefer?",
      content: "Do you prefer Python's list comprehensions or using `map()` and `filter()` for transforming and filtering data?",
      vote_count: 35,
      comment_count: 20
    },
    {
      id: 5,
      subreddit_avatar: "https://ui-avatars.com/api/?name=AI&background=7f00ff&color=ffffff&size=64",
      subreddit_name: "machinelearning",
      time: 1,
      title: "Transformer architecture visualized",
      media: "https://upload.wikimedia.org/wikipedia/en/4/4b/My_Bloody_Valentine_-_Loveless.png",
      content: "Visual explanation of how the Transformer model processes sequences.",
      vote_count: 42,
      comment_count: 22
    },
    {
      id: 6,
      subreddit_avatar: "https://ui-avatars.com/api/?name=UX&background=ffaa00&color=ffffff&size=64",
      subreddit_name: "uxdesign",
      time: 10,
      title: "Dark mode done right",
      media: "https://upload.wikimedia.org/wikipedia/en/4/42/ATribeCalledQuestTheLowEndtheory.jpg",
      vote_count: 19,
      comment_count: 4
    },
    {
      id: 7,
      subreddit_avatar: "https://ui-avatars.com/api/?name=Dev&background=ff5555&color=ffffff&size=64",
      subreddit_name: "webdev",
      time: 4,
      title: "Should I still learn jQuery in 2025?",
      content: "I'm a beginner and some courses still teach jQuery. Should I skip it or learn it for legacy reasons?",
      vote_count: 12,
      comment_count: 8
    },
    {
      id: 8,
      subreddit_avatar: "https://ui-avatars.com/api/?name=AWS&background=232f3e&color=ffffff&size=64",
      subreddit_name: "aws",
      time: 6,
      title: "AWS Billing Dashboard - Redesign Concepts",
      media: "https://upload.wikimedia.org/wikipedia/en/6/64/Pavement_Crooked_Rain.jpg",
      vote_count: 27,
      comment_count: 6
    },
    {
      id: 9,
      subreddit_avatar: "https://ui-avatars.com/api/?name=CS&background=0055aa&color=ffffff&size=64",
      subreddit_name: "computerscience",
      time: 8,
      title: "How do hash tables work internally?",
      content: "I get the high-level idea, but how are collisions resolved and how does resizing really work?",
      vote_count: 33,
      comment_count: 14
    },
    {
      id: 10,
      subreddit_avatar: "https://ui-avatars.com/api/?name=UI&background=9932cc&color=ffffff&size=64",
      subreddit_name: "frontend",
      time: 9,
      title: "Color palette suggestions for a fintech dashboard?",
      content: "Trying to keep it professional but modern. What shades and tones work best for trust and clarity?",
      media: "https://upload.wikimedia.org/wikipedia/en/f/fd/Elliottsmitheitheror55.jpg",
      vote_count: 21,
      comment_count: 9
    }
  ];
  
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