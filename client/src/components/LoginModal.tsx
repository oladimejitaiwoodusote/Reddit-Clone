import { useModal } from "../context/ModalContext";
import '../styles/Modal.css'


function LoginModal() {
    const {modalType, closeModal, openModal} = useModal();
    
    if (modalType !== "login") return null;

    return (
        <div className="Modal_overlay">
            <div className="Modal">
                <button className= "Modal_close" onClick={closeModal}>
                    x
                </button>
                <h2 className="Modal_title">Log In</h2>

                <form className="Modal_form">
                    <input className="Modal_input_field" placeholder="Email or username *"/>
                    <input className="Modal_input_field" placeholder="Password *"/>
                    
                </form>

                <p className="Modal_footer">
                    New to Reddit?{" "}
                    <span
                        className="Modal_signup_link"
                        onClick={() => openModal("signup")}
                    >
                        Sign Up
                    </span>
                </p>

                <button type="submit" className="Modal_submit_button">
                        Log In
                </button>

            </div>
        </div>
    )
}

export default LoginModal