import { useModal } from "../context/ModalContext";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import '../styles/Modal.css'

function LoginModal() {
    const {modalType, closeModal, openModal} = useModal();
    const {login} = useAuth();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    
    if (modalType !== "login") return null;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await login({identifier, password});
        setIdentifier("")
        setPassword("")
        closeModal();
    }

    return (
        <div className="Modal_overlay">
            <div className="Modal">
                <button className= "Modal_close" onClick={closeModal}>
                    x
                </button>
                <h2 className="Modal_title">Log In</h2>

                <form className="Modal_form" onSubmit={handleSubmit}>
                    <input className="Modal_input_field" placeholder="Email or username *" value={identifier} onChange={(e)=> setIdentifier(e.target.value)}/>
                    <input className="Modal_input_field" type="password" placeholder="Password *" value={password} onChange={(e) => setPassword(e.target.value)}/>                    
                    <button type="submit" className="Modal_submit_button">
                            Log In
                    </button>
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
            </div>
        </div>
    )
}

export default LoginModal