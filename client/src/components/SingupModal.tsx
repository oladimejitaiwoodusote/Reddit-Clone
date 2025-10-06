import { useModal } from "../context/ModalContext";
import '../styles/Modal.css'

function SignupModal() {
    const {modalType, closeModal, openModal} = useModal();

    if (modalType !== "signup") return null;

    return (
        <div className="Modal_overlay">
            <div className="Modal">
                <button className= "Modal_close" onClick={closeModal}>
                    x
                </button>
                <h2 className="Modal_title">Sign Up</h2>

                <form className="Modal_form">
                    <input className="Modal_input_field" placeholder="Email*"/>
                    <input className="Modal_input_field" placeholder="Username*"/>
                    <input className="Modal_input_field" placeholder="Fullname*"/>
                    <input className="Modal_input_field" placeholder="Password *"/>                
                </form>

                <p className="Modal_footer">
                    Already a redditor?{" "}
                    <span
                        className="Modal_signup_link"
                        onClick={() => openModal("login")}
                    >
                        Log In
                    </span>
                </p>

                <button type="submit" className="Modal_submit_button">
                        Sign Up
                </button>

            </div>
        </div>
    )
}

export default SignupModal