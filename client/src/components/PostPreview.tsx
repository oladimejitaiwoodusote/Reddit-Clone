import '../styles/PostPreview.css'
import Vote from './Vote'

export interface Post{
    id: number,
    subreddit_avatar: string
    subreddit_name: string,
    time: number,
    title: string,
    content: string,
    vote_count: number,
    comment_count: number
}

interface PostPreviewProps{
    post:Post
}

function PostPreview({post}: PostPreviewProps) {
  return (
    <div key={post.id} className="PostPreview">
        <div className='PostPreview_Header'>
            <div className="PostPreview_Meta">
                <img src={post.subreddit_avatar} alt={post.subreddit_avatar}/>
                <span className='PostPreview_Subreddit'>r/{post.subreddit_name}</span>
                <span className='PostPreview_Dot'> • </span>
                <p className='PostPreview_Time'>{post.time} hrs ago</p>
                <span className='PostPreview_Dot'> • </span>
            </div>
            <div className='PostPreview_JoinButton'>
                <button>Join</button>
            </div>
        </div>
        <div className='PostPreview_Title'>
            <span>{post.title}</span>
        </div>
        <div className='PostPreview_Content'>
            <p>{post.content}</p>
        </div>
        <div className='PostPreview_Interactions'>
            {/* To do: Comment component */}
            <Vote vote_count={post.vote_count}/>
            <span>💬 {post.comment_count} Comments</span>
        </div>
    </div>
  )
}

export default PostPreview