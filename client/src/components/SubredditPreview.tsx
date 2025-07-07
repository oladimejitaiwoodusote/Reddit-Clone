import '../styles/SubredditPreview.css'
import { Link } from 'react-router-dom';
import { SubredditData } from '../types';

interface SubredditPreviewProps{
    subreddit:SubredditData
}

function SubredditPreview({subreddit}: SubredditPreviewProps) {
  return (
    <Link to={`subreddit/r/${subreddit.name}`} className="SubredditPreviewLink">                   
        <div key={subreddit.id} className="SubredditPreview">
            <img src={subreddit.avatar} alt={`r/${subreddit.name}`}/>
            <div className="SubredditPreviewInfo">
                <strong>r/{subreddit.name}</strong>
                <p>{subreddit.member_count} members</p>
            </div>
        </div> 
    </Link>    
  );
}

export default SubredditPreview