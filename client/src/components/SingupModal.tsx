import React, { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import '../styles/Modal.css'

function SignupModal() {
    const {modalType, closeModal, openModal} = useModal();
    const {signup} = useAuth();

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")

    if (modalType !== "signup") return null;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await signup({
            email,
            username,
            full_name: fullName,
            password
        })

        closeModal();
        
    }

    return (
        <div className="Modal_overlay">
            <div className="Modal">
                <button className= "Modal_close" onClick={closeModal}>
                    x
                </button>
                <h2 className="Modal_title">Sign Up</h2>

                <form className="Modal_form" onSubmit={handleSubmit}>
                    <input 
                        className="Modal_input_field" 
                        placeholder="Email*" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <input 
                        className="Modal_input_field" 
                        placeholder="Username*"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    <input 
                        className="Modal_input_field" 
                        placeholder="Fullname*"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        />
                    <input 
                        className="Modal_input_field" 
                        placeholder="Password*" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />                
                <button type="submit" className="Modal_submit_button">
                        Sign Up
                </button>
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


            </div>
        </div>
    )
}

export default SignupModal