import SubredditPreview from "./SubredditPreview";
import { SubredditData } from "../types";
import { GoHome } from "react-icons/go";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import '../styles/Sidebar.css'
import { useEffect, useState } from "react";

function Sidebar() {
    
    const [subreddits, setSubreddits] = useState<SubredditData[]>([])
    useEffect(() => {
      fetch(`http://127.0.0.1:5000//subreddits/all`)
      .then(response => response.json())
      .then(data=> setSubreddits(data))
    },[])

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
                {subreddits.map((subreddit) => (
                    <SubredditPreview key={subreddit.id} subreddit={subreddit}/>
                ))}
            </div>            
        </div>
    </div>
  )
}

export default Sidebar