import { GoHome } from "react-icons/go";
import { BsArrowUpRightCircle } from "react-icons/bs";

function Sidebar() {
    {/*Maybe create some fake subreddit data for the communities section*/}

    const dummySubreddits = [
        {
            id : 1,
            name: "Javascript",
            avatar: "https://styles.redditmedia.com/t5_2qh30/styles/communityIcon_youricon.png",
            members: 1200000
        },
        {
            id: 2,
            name: "reactJs",
            avatar:"ttps://styles.redditmedia.com/t5_2zldd/styles/communityIcon_reacticon.png",
            members: 85000
        },
        {
            id: 3,
            name: "webdev",
            avatar: "https://styles.redditmedia.com/t5_2qt55/styles/communityIcon_webdevicon.png",
            members: 400000,
        }
    ]
  
    return (
    <div className="Sidebar">
        <div className="Sidebar_Home">
            <a href="/">
                <GoHome/>
                <span>Home</span>                
            </a>
            <a href="/popular">
                <BsArrowUpRightCircle/>
                <span>Popular</span>                
            </a>
        </div>
        <div className="Sidebar_Threads">
            <h4>POPULAR COMMUNITIES</h4>
            <div className="Sidebar_CommunityList">
            {/*Need to import them from backend*/}
                {dummySubreddits.map((subreddit) => (
                    <div key={subreddit.id} className="Sidebar_CommunityItem">
                        <img src={subreddit.avatar} alt={`r/${subreddit.name}`}/>
                        <div className="Sidebar_CommunityInfo">
                            <strong>r/{subreddit.name}</strong>
                            <p>{subreddit.members.toLocaleString()} members</p>
                        </div>
                    </div>
                ))}
            </div>            
        </div>
    </div>
  )
}

export default Sidebar