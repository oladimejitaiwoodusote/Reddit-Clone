import { GoHome } from "react-icons/go";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import '../styles/Sidebar.css'

function Sidebar() {
    {/*Maybe create some fake subreddit data for the communities section*/}

    const dummySubreddits = [
        {
          id: 1,
          name: "javascript",
          avatar: "https://ui-avatars.com/api/?name=JS&background=ff9900&color=ffffff&size=64",
          members: 1200000,
        },
        {
          id: 2,
          name: "reactjs",
          avatar: "https://ui-avatars.com/api/?name=React&background=61dafb&color=000000&size=64",
          members: 850000,
        },
        {
          id: 3,
          name: "webdev",
          avatar: "https://ui-avatars.com/api/?name=WebDev&background=4caf50&color=ffffff&size=64",
          members: 400000,
        },
      ]
  
    return (
    <div className="Sidebar">
        <div className="Sidebar_Home">
            <NavLink to="/" className="Sidebar_Link">
                <GoHome/>
                <span>Home</span>                
            </NavLink>
            <NavLink to="/popular" className="Sidebar_Link">
                <BsArrowUpRightCircle/>
                <span>Popular</span>                
            </NavLink>
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