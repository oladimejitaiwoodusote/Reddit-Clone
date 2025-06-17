import '../styles/PostPreview.css'

export interface Post{
    id: number,
    subreddit_name: string,
    time: number,
    title: string,
    content: string
}

interface PostPreviewProps{
    post:Post
}

function PostPreview({post}: PostPreviewProps) {
  return (
    <div key={post.id} className="PostPreview">
        <div className='PostPreview_Header'>
            <div className='PostPreview_Subreddit'>
                <span>r/{post.subreddit_name}</span>
            </div>
            <div className='PostPreview_Time'>
                <p>{post.time} hrs ago</p>
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
            {/* To do: Vote component */}
            {/* To do: Comment component */}
        </div>
    </div>
  )
}

export default PostPreview