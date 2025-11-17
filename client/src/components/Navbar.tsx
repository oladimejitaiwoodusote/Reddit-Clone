import { FaReddit, FaSearch, FaRegPlusSquare } from "react-icons/fa";
import '../styles/Navbar.css'
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const {openModal} = useModal();
  const {isAuthenticated, logout, user} = useAuth()
  const navigate = useNavigate()

  function handleAuthClick() {
    if(isAuthenticated){
      logout();
    } else {
      openModal("login");
    }
  }

  function handleProfileClick(){
    navigate(`/profile`)
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
          {isAuthenticated ? (
            <>
              {/* Create Post Button */}
              <button className="Navbar_createBtn" onClick={() => navigate('/submit')}>
                <FaRegPlusSquare className="Navbar_plusIcon"/>
                <span>Create</span>
              </button>

              {/* User Avatar */}
              <div className="Navbar_avatar" onClick={handleProfileClick}>
                {user?.avatar? (
                  <img src={user.avatar} alt="User Avatar"/>
                ) : (
                  <div className="Navbar_avatarPlaceholder">
                    {user?.username.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>

              {/* Log Out Button*/}
              <button type="button" onClick={handleAuthClick}>
                Log Out
              </button>
            </>
          ) : (
            <button type="button" onClick={handleAuthClick}>
              Log In
            </button>
          )}
        </div>
    </nav>
  )
}

export default Navbar