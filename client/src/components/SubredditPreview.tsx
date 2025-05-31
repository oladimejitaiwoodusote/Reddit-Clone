import '../styles/SubredditPreview.css'

export interface Subreddit {
    id: number;
    name: string;
    avatar: string;
    member_count: number;
}

interface SubredditPreviewProps{
    subreddit:Subreddit
}

function SubredditPreview({subreddit}: SubredditPreviewProps) {
  return (
        <div key={subreddit.id} className="SubredditPreview">
            <img src={subreddit.avatar} alt={`r/${subreddit.name}`}/>
            <div className="SubredditPreviewInfo">
                <strong>r/{subreddit.name}</strong>
                <p>{subreddit.member_count} members</p>
            </div>
        </div>     
  );
}

export default SubredditPreview