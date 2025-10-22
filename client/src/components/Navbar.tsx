import { FaReddit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa"; 
import '../styles/Navbar.css'
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const {openModal} = useModal();
  const {isAuthenticated, logout} = useAuth()

  function handleAuthClick() {
    if(isAuthenticated){
      logout();
    } else {
      openModal("login");
    }
  }

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
            <button type="button" onClick={handleAuthClick}>
              {isAuthenticated ? "Log Out": "Log In"}
            </button>
        </div>
    </nav>
  )
}

export default Navbar