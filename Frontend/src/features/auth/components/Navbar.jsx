
import React from "react";
import { Link, useNavigate } from "react-router";
import "./navbar.scss";

const Navbar = ({ user, onLogout, loading }) => {
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        await onLogout();
        navigate("/login", { replace: true });
    };

    return (
        <nav className="app-navbar">
            <Link to="/" className="navbar-brand">
                <span className="brand-icon">AI</span>
                <span>Interview Prep</span>
            </Link>

            <div className="navbar-actions">
                <div className="navbar-user">
                    <span className="user-avatar">
                        {(user?.username || "U")
                            .charAt(0)
                            .toUpperCase()}
                    </span>

                    <span className="username">
                        {user?.username || "User"}
                    </span>
                </div>

                <button
                    type="button"
                    className="navbar-logout"
                    onClick={handleLogoutClick}
                    disabled={loading}
                >
                    {loading ? "Logging out..." : "Logout"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
