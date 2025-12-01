import '../styles/ProfilePage.css'
import { useAuth } from '../context/AuthContext'
import { useModal } from '../context/ModalContext'
import React, { useState } from 'react'

function ProfilePage() {
    const API = import.meta.env.VITE_API_BASE_URL
    const {user, isAuthenticated, loading} = useAuth()
    const {openModal} = useModal()

    if (loading) {
        return <div className='profile-container'>Loading...</div>
    }
    if (!isAuthenticated) {
        openModal("login")
    }

    const [fullName, setFullName] = useState(user?.full_name)
    const [email, setEmail] = useState(user?.email)
    const [bio, setBio] = useState(user?.bio)
    const [avatar, setAvatar] = useState<File | string | undefined>(user?.avatar)

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    async function refreshUser(){
        try {
            const res = await fetch(`${API}/user/me`, {
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setFullName(data.full_name)
                setEmail(data.email)
                setBio(data.bio || "")
                setAvatar(data.avatar || "");
            }
        } catch(err) {
            console.error("Failed to refresh user after update:", err)
        }
    }
    
    async function handleProfileSave(e: React.FormEvent){    
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const form = new FormData();
            form.append("full_name", fullName || "")
            form.append("email", email || "")
            form.append("bio", bio || "");

            if (avatar instanceof File) {
                form.append("avatar", avatar)
            }

            const res = await fetch(`${API}/user/patch`, {
                method: "PATCH",
                credentials: "include",
                body: form,
            });

            if (res.ok) {
                setMessage("Profile updated succesfully")
                await refreshUser();
            } else {
                const err = await res.json();
                setError(err.message || "Failed to update profile.")
            }
        } catch(err) {
            console.error("Profile update error:", err);
            setError("An updated error occured.")
        }
    }

    async function handlePasswordChange(e: React.FormEvent){
        e.preventDefault()
        setMessage(null);
        setError(null);

        if (!currentPassword || !newPassword) {
            setError("Both current and new password are required")
            return;
        }

        try {
            const res = await fetch(`${API}/user/patch`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                })
            });

            if (res.ok) {
                setMessage("Password updated successfully.");
                setCurrentPassword("");
                setNewPassword("");
            } else {
                // ⭐ NEW: SAFER JSON HANDLING
                let errText = "Failed to update password.";
                try {
                    const err = await res.json();
                    errText = err.message || errText;
                } catch(_) {}

                setError(errText);
            }
        } catch(err) {
            console.error("Password change error:", err);
            setError("An unexpected error occured.")
        }
    }

  return (
    <div className='profile-container'>
        <h2>Profile Page</h2>

        {message && <p style ={{color: "green"}}>{message}</p>}
        {error && <p style ={{color: "red"}}>{error}</p>}

        {/* Profile Info Form*/}
        <form onSubmit={handleProfileSave} className='profile-form' >
            <label>
                Full Name
                <input
                    value ={fullName}
                    onChange = {(e) => setFullName(e.target.value)}
                />
            </label>
            <label>
                Email
                <input
                    value={email}
                    onChange ={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Avatar
                {typeof avatar === "string" && (
                    <img src={avatar} alt="avatar" className='avatar-preview'/>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) {
                            setAvatar(file);
                        }
                    }}
                />
            </label>
            <label>
                Bio
                <textarea /*value={bio}*/ onChange={(e) => setBio(e.target.value)} />
            </label>

            <button type='submit'>Save Changes</button>
        </form>

        <hr />

        {/* Password Change Form*/}
        <form onSubmit={handlePasswordChange} className='password-form'>
            <h3>Change Password</h3>

            <label>
                Current Password
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e)=> setCurrentPassword(e.target.value)}
                />
            </label>
            <label>
                New Password
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </label>
            <button type="submit">Update Password</button>
        </form>
    </div>
  )
}

export default ProfilePage