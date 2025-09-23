import { useModal } from "../context/ModalContext";
import '../styles/LoginModal.css'


function LoginModal() {
    const {modalType, closeModal} = useModal();

    if (modalType !== "login") return null;

    return (
        <div className="LoginModal_overlay">
            <div className="LoginModal">
                <h2>Login</h2>
                {/* login form here */}
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}

export default LoginModal