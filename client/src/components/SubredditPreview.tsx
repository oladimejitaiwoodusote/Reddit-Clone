import '../styles/SubredditPreview.css'

interface Subreddit {
    id: number;
    name: string;
    avatar: string;
    members: number;
}

function SubredditPreview({subreddit}: {subreddit: Subreddit}) {
  return (
        <div key={subreddit.id} className="SubredditPreview">
            <img src={subreddit.avatar} alt={`r/${subreddit.name}`}/>
            <div className="SubredditPreviewInfo">
                <strong>r/{subreddit.name}</strong>
                <p>{subreddit.members.toLocaleString()} members</p>
            </div>
        </div>     
  );
}

export default SubredditPreview