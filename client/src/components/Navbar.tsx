import { FaReddit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa"; 
import '../styles/Navbar.css'


function Navbar() {
  return (
    <nav className="Navbar">
        <a href="/" className="Navbar_left">            
            <FaReddit aria-hidden="true"/>
            <span>reddit</span>
        </a>
        <div className="Navbar_middle">
            <div className="Navbar_searchWrapper">
              <FaSearch className="Navbar_searchIcon"/>
              <input type="text" placeholder="Search Reddit"/>
            </div>           
        </div>
        
        <div className="Navbar_right">
            <button type="button">
              Log In
            </button>
        </div>
    </nav>
  )
}

export default Navbar