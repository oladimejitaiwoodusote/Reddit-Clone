import { useModal } from "../context/ModalContext";

function SignupModal() {
    const {modalType, closeModal} = useModal();

    if (modalType !== "signup") return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Sign Up</h2>
                {/* login form here */}
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}

export default SignupModal