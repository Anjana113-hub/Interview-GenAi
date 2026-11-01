
import React, { useState } from "react"
import { useNavigate, Link } from "react-router"
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

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

        const result = await handleLogin({ email, password })

        if (result.success) {
            showToast("Login successful! Welcome back.", "success")

            setTimeout(() => {
                navigate("/")
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
                    Your <span>AI-Powered</span>
                    <br />
                    Interview Companion
                </h1>

                <p className="hero-description">
                    Upload your resume, get personalized interview
                    questions, skill-gap analysis, and a preparation plan.
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
                    <h1>Welcome Back!</h1>
                    <p>Sign in to continue your AI interview journey.</p>
                </div>

                <form onSubmit={handleSubmit}>

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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={submitting || loading}
                    >
                        {submitting ? "Signing in..." : "Login to Your Account"}
                    </button>

                </form>

                <p className="auth-switch">
                    Don't have an account?
                    <Link to="/register">Register</Link>
                </p>

                <div className="card-footer">
                    Secure Login • AI-Powered Preparation
                </div>

            </section>

        </main>
    )
}

export default Login
