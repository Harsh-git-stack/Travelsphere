import { useState } from "react";
import API_BASE_URL from "../api";

function LoginSection({ onLogin, requireAdmin = false }) {
  const [viewMode, setViewMode] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;

    setResetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      if (requireAdmin && data.user?.role !== "admin") {
        setMessage("Only admin can access this page");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setMessage("Login successful");
      setFormData({
        email: "",
        password: "",
      });

      if (onLogin) {
        onLogin(data);
      }
    } catch {
      setMessage("Something went wrong");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not send OTP");
        return;
      }

      setMessage("OTP sent to your email");
      setResetData({
        email: forgotEmail,
        otp: "",
        password: "",
        confirmPassword: "",
      });
      setViewMode("reset");
    } catch {
      setMessage("Something went wrong");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Password reset failed");
        return;
      }

      setMessage("Password reset successful. Please login now.");
      setFormData((prev) => ({
        ...prev,
        email: resetData.email,
        password: "",
      }));
      setForgotEmail("");
      setResetData({
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
      });
      setViewMode("login");
    } catch {
      setMessage("Something went wrong");
    }
  };

  return (
    <section className="auth-card">
      <div className="auth-card__header">
        <p className="section-tag">
          {viewMode === "login"
            ? "Welcome back"
            : viewMode === "forgot"
              ? "Forgot password"
              : "Reset password"}
        </p>
        <h2>
          {viewMode === "login"
            ? "Login"
            : viewMode === "forgot"
              ? "Send OTP"
              : "Reset Password"}
        </h2>
      </div>

      {viewMode === "login" ? (
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="site-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="site-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="site-button" type="submit">Login</button>

          <button
            className="nav-button nav-button--ghost"
            type="button"
            onClick={() => {
              setMessage("");
              setForgotEmail(formData.email);
              setViewMode("forgot");
            }}
          >
            Forgot Password?
          </button>
        </form>
      ) : null}

      {viewMode === "forgot" ? (
        <form className="auth-form" onSubmit={handleForgotPassword}>
          <input
            className="site-input"
            type="email"
            placeholder="Enter your registered email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />

          <button className="site-button" type="submit">Send OTP</button>

          <button
            className="nav-button nav-button--ghost"
            type="button"
            onClick={() => {
              setMessage("");
              setViewMode("login");
            }}
          >
            Back to Login
          </button>
        </form>
      ) : null}

      {viewMode === "reset" ? (
        <form className="auth-form" onSubmit={handleResetPassword}>
          <input
            className="site-input"
            type="email"
            name="email"
            value={resetData.email}
            readOnly
          />

          <input
            className="site-input"
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={resetData.otp}
            onChange={handleResetChange}
          />

          <input
            className="site-input"
            type="password"
            name="password"
            placeholder="Enter new password"
            value={resetData.password}
            onChange={handleResetChange}
          />

          <input
            className="site-input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={resetData.confirmPassword}
            onChange={handleResetChange}
          />

          <button className="site-button" type="submit">Reset Password</button>

          <button
            className="nav-button nav-button--ghost"
            type="button"
            onClick={() => {
              setMessage("");
              setViewMode("login");
            }}
          >
            Back to Login
          </button>
        </form>
      ) : null}

      {message && <p className="form-message">{message}</p>}
    </section>
  );
}

export default LoginSection;