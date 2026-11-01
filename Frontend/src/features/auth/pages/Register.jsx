
import React, { useState } from "react"
import { useNavigate, Link } from "react-router"
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"

const Register = () => {
    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [toast, setToast] = useState(null)

    const showToast = (message, type = "success") => {
        setToast({ message, type })

        setTimeout(() => {
            setToast(null)
        }, 2500)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (submitting) return

        setSubmitting(true)

        const result = await handleRegister({
            username,
            email,
            password
        })

        if (result.success) {
            showToast("Account created successfully! Welcome aboard.", "success")

            setTimeout(() => {
                navigate("/login")
            }, 1000)
        } else {
            showToast(result.message, "error")
            setSubmitting(false)
        }
    }

    return (
        <main className="auth-page">

            {toast && (
                <div className={`auth-toast ${toast.type}`} role="status">
                    <span className="toast-icon">
                        {toast.type === "success" ? "✓" : "!"}
                    </span>
                    <span className="toast-text">{toast.message}</span>
                </div>
            )}

            <section className="auth-hero">

                <div className="auth-brand">
                    <img src="/logo.svg" alt="AI Interview Prep logo" />

                    <div>
                        <div className="brand-name">
                            AI <span>Interview Prep</span>
                        </div>
                        <div className="brand-tagline">
                            Prepare Smarter. Interview Better.
                        </div>
                    </div>
                </div>

                <h1 className="hero-heading">
                    Start Your <span>AI Interview</span>
                    <br />
                    Preparation Journey
                </h1>

                <p className="hero-description">
                    Create your account and get personalized interview
                    questions, resume-based insights, and a smarter
                    preparation roadmap.
                </p>

                <div className="feature-list">
                    <div className="feature">
                        <span className="feature-icon">✦</span>
                        Personalized Preparation
                    </div>

                    <div className="feature">
                        <span className="feature-icon">▥</span>
                        Skill Gap Analysis
                    </div>

                    <div className="feature">
                        <span className="feature-icon">➤</span>
                        Boost Your Confidence
                    </div>
                </div>

                <p className="hero-footer">
                    AI Interview Prep • Build Skills • Crack Interviews
                </p>

            </section>

            <section className="auth-card">

                <img
                    src="/logo.svg"
                    alt="AI Interview Prep"
                    className="card-logo"
                />

                <div className="card-heading">
                    <h1>Create Account</h1>
                    <p>Join us and prepare smarter for your next interview.</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            minLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={submitting || loading}
                    >
                        {submitting ? "Creating Account..." : "Create My Account"}
                    </button>

                </form>

                <p className="auth-switch">
                    Already have an account?
                    <Link to="/login">Login</Link>
                </p>

                <div className="card-footer">
                    Build Skills • Prepare Smarter • Crack Interviews
                </div>

            </section>

        </main>
    )
}

export default Register
