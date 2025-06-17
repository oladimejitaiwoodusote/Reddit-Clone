import '../styles/Home.css'
import PostPreview, {Post} from '../components/PostPreview'

function Home() {
  const dummyPosts:Post[] = [
    {
      id: 1,
      subreddit_avatar: "https://ui-avatars.com/api/?name=JS&background=ff9900&color=ffffff&size=64",
      subreddit_name: "javascript",
      time: 3,
      title: "Understanding Closures in JavaScript",
      content: "Closures are one of the most powerful features of JavaScript. In essence, a closure is a function that has access to its own scope, the scope of the outer function, and the global scope. This means that even after the outer function has returned, the inner function still has access to the variables defined in the outer function. Closures are commonly used for data privacy and are a key part of JavaScript's functional programming capabilities. For example, they can be used to emulate private variables. Mastering closures is essential for understanding more advanced topics like currying, memoization, and creating function factories. Here's a simple closure: function outer() { let count = 0; return function inner() { count++; console.log(count); } } const counter = outer(); counter(); counter(); // Output: 1, 2",
      comment_count: 20,
      vote_count: 30
      
    },
    {
      id: 2,
      subreddit_avatar: "https://ui-avatars.com/api/?name=React&background=61dafb&color=000000&size=64",
      subreddit_name: "react",
      time: 5,
      title: "Best practices for React component structure",
      content: "How do you guys structure your folders for scalability? I've been reading about atomic design, feature-based structures, and even domain-driven approaches. Right now, my components folder is a bit of a mess, with reusable components mixed in with page-specific ones. I'm curious to know how other developers organize things as projects grow. Do you use something like /components, /pages, /hooks, and /utils? Or do you group everything by feature, even if that means some duplication? I want to future-proof my setup before it becomes unmanageable. Would love to hear what’s worked well for you all, especially in large teams or codebases maintained over time.",
      comment_count: 10,
      vote_count: 20
    },
    {
      id: 3,
      subreddit_avatar: "https://ui-avatars.com/api/?name=Go&background=00ADD8&color=ffffff&size=64",
      subreddit_name: "go",
      time: 2,
      title: "How do you handle errors in Go idiomatically?",
      content: "I'm coming from Python and the verbose error handling in Go feels clunky. I find myself writing `if err != nil` blocks after nearly every function call, and it's starting to feel repetitive and messy. I know that's the Go way, but are there idiomatic patterns or helper libraries that can make it cleaner? Some people suggest wrapping errors or using sentinel errors with `errors.Is`, but that adds complexity too. Are defer-recover patterns ever acceptable? How do experienced Go developers keep their code readable and error handling robust at the same time? Would love to see examples or your error-handling philosophy for larger Go projects or microservices.",
      comment_count: 15,
      vote_count: 25
    },
    {
      id: 4,
      subreddit_avatar: "https://ui-avatars.com/api/?name=Py&background=306998&color=ffffff&size=64",
      subreddit_name: "python",
      time: 7,
      title: "List comprehension vs map/filter: which do you prefer?",
      content: "Do you prefer Python's list comprehensions or using `map()` and `filter()` for transforming and filtering data? I’ve noticed that list comprehensions are more readable for most simple use cases, and they seem to be more Pythonic overall. But sometimes `map` and `filter` feel cleaner, especially when chaining operations or using lambda functions. Is it mostly a matter of style, or are there performance differences? Also curious if readability is affected when working in teams. In functional programming languages, map/filter are a core part of the workflow, but Python seems to lean toward list comprehensions. What's your personal rule of thumb?",
      comment_count: 20,
      vote_count: 35
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