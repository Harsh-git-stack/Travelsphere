import { useState } from "react";
import API_BASE_URL from "../api";

function AdminSection() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
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

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/tours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Tour creation failed");
        return;
      }

      setMessage("Tour created successfully");
      console.log("Created tour:", data);
    } catch {
      setMessage("Something went wrong");
    }
  };

  return (
    <section className="auth-card">
      <div className="auth-card__header">
        <p className="section-tag">Admin desk</p>
        <h2>Create Tour</h2>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="site-input"
          type="text"
          name="title"
          placeholder="Enter tour title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          className="site-input"
          type="text"
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          className="site-input"
          type="text"
          name="location"
          placeholder="Enter location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          className="site-input"
          type="number"
          name="price"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
        />

        <button className="site-button" type="submit">Create Tour</button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </section>
  );
}

export default AdminSection;
