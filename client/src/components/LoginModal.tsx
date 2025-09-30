import { useModal } from "../context/ModalContext";
import '../styles/LoginModal.css'


function LoginModal() {
    const {modalType, closeModal, openModal} = useModal();
    
    if (modalType !== "login") return null;

    return (
        <div className="LoginModal_overlay">
            <div className="LoginModal">
                <button className= "LoginModal_close" onClick={closeModal}>
                    x
                </button>
                <h2>Log In</h2>
                {/* login form here */}
                <form className="LoginModal_form">
                    <input className="LoginModal_input_field" placeholder="Email or username"/>
                    <input className="LoginModal_input_field" placeholder="Password"/>
                    <button type="submit" className="LoginModal_submit_button">
                        Log In
                    </button>
                </form>

                <p className="LoginModal_footer">
                    New to Reddit?{" "}
                    <span
                        className="LoginModal_signup_link"
                        onClick={() => openModal("signup")}
                    >
                        Sign up
                    </span>
                </p>

            </div>
        </div>
    )
}

export default LoginModal