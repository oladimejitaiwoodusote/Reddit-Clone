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
                <h2 className="LoginModal_title">Log In</h2>

                <form className="LoginModal_form">
                    <input className="LoginModal_input_field" placeholder="Email or username *"/>
                    <input className="LoginModal_input_field" placeholder="Password *"/>
                    
                </form>

                <p className="LoginModal_footer">
                    New to Reddit?{" "}
                    <span
                        className="LoginModal_signup_link"
                        onClick={() => openModal("signup")}
                    >
                        Sign Up
                    </span>
                </p>

                <button type="submit" className="LoginModal_submit_button">
                        Log In
                </button>

            </div>
        </div>
    )
}

export default LoginModal