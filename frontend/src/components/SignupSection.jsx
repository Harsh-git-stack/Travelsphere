import { useState } from "react";
import API_BASE_URL from "../api";

function SignupSection({ onSignupSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const signupData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      password: formData.password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      setMessage("Signup successful");
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        password: "",
        confirmPassword: "",
      });

      if (onSignupSuccess) {
        onSignupSuccess(data);
      }
    } catch {
      setMessage("Something went wrong");
    }
  };

  return (
    <section className="auth-card">
      <div className="auth-card__header">
        <p className="section-tag">New here</p>
        <h2>Signup</h2>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="site-input"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

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
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          className="site-input"
          type="text"
          name="country"
          placeholder="Enter your country"
          value={formData.country}
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

        <input
          className="site-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button className="site-button" type="submit">Signup</button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </section>
  );
}

export default SignupSection;
