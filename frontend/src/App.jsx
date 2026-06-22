import { useState } from "react";
import "./App.css";
import ToursSection from "./components/ToursSection";
import LoginSection from "./components/LoginSection";
import SignupSection from "./components/SignupSection";
import AdminSection from "./components/AdminSection";
import heroImage from "./assets/travel-hero.png";

const getStoredUser = () => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

function App() {
  const [authMode, setAuthMode] = useState(null);
  const [authUser, setAuthUser] = useState(getStoredUser);
  const isAdminPage = window.location.pathname === "/admin";
  const isAdminAuthenticated = authUser?.role === "admin";

  const closeAuth = () => setAuthMode(null);
  const handleLoginSuccess = (data) => {
    setAuthUser(data.user);
    closeAuth();
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthUser(null);
    closeAuth();
  };

  return (
    <div className="app">
      <header className="site-header">
        <nav className="site-nav" aria-label="Primary navigation">
          <a className="site-brand" href="/">
            TravelSphere
          </a>
          <div className="site-nav__links">
            <a href="/#tours">Tours</a>
            <a href="/#booking">Booking</a>
            <a href="/admin">Admin</a>
          </div>
          <div className="site-nav__actions">
            {authUser ? (
              <>
                <span className="nav-user">
                  {authUser.name} ({authUser.role})
                </span>
                <button
                  className="nav-button nav-button--ghost"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="nav-button nav-button--ghost"
                  type="button"
                  onClick={() => setAuthMode("login")}
                >
                  Log in
                </button>
                <button
                  className="nav-button nav-button--primary"
                  type="button"
                  onClick={() => setAuthMode("signup")}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {isAdminPage ? (
        <main className="admin-page">
          {isAdminAuthenticated ? (
            <section className="account-section">
              <div className="section-heading">
                <p className="section-tag">Admin desk</p>
                <h2>Manage new tour listings.</h2>
                <p>Create fresh destination packages for the public tour catalog.</p>
              </div>
              <div className="admin-panel">
                <AdminSection />
              </div>
            </section>
          ) : (
            <section className="account-section">
              <div className="section-heading">
                <p className="section-tag">Admin access only</p>
                <h2>Log in with an admin account.</h2>
                <p>
                  This page is protected. Only a user whose role is admin can
                  open the TravelSphere admin panel.
                </p>
              </div>
              <div className="admin-panel">
                <LoginSection requireAdmin onLogin={handleLoginSuccess} />
              </div>
            </section>
          )}
        </main>
      ) : (
        <main>
          <section className="hero-section" id="home">
            <img className="hero-section__image" src={heroImage} alt="" />
            <div className="hero-section__overlay" />
            <div className="hero-section__content">
              <p className="section-tag">Curated tours worldwide</p>
              <h1>TravelSphere</h1>
              <p className="hero-copy">
                Discover handpicked escapes, compare live tour options, and book a
                trip that feels made for your pace.
              </p>
              <div className="hero-actions">
                <a className="site-button" href="#tours">
                  Explore tours
                </a>
                <a className="site-button site-button--ghost" href="#booking">
                  Plan my trip
                </a>
              </div>
            </div>
            <div className="hero-stat">
              <span>From weekend breaks to bucket-list routes</span>
              <strong>One place to browse, choose, and book.</strong>
            </div>
          </section>

          <section className="info-section" aria-label="TravelSphere highlights">
            <div className="section-heading">
              <p className="section-tag">Why travelers choose us</p>
              <h2>Polished trips, simple booking, real destination details.</h2>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <span>01</span>
                <h3>Curated routes</h3>
                <p>Browse tours by destination and choose the one that matches your mood.</p>
              </article>
              <article className="feature-card">
                <span>02</span>
                <h3>Clear pricing</h3>
                <p>See the tour price up front before sending a booking request.</p>
              </article>
              <article className="feature-card">
                <span>03</span>
                <h3>Fast planning</h3>
                <p>Select a tour, add your travel date, and share the details in one flow.</p>
              </article>
            </div>
          </section>

          <ToursSection />
        </main>
      )}

      <footer className="site-footer">
        <div>
          <h3>TravelSphere</h3>
          <p>Designed for smooth tour discovery and booking.</p>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/#tours">Tours</a>
          <a href="/admin">Admin</a>
        </div>
      </footer>

      {authMode && (
        <div
          className="auth-modal"
          role="dialog"
          aria-modal="true"
          aria-label={authMode === "login" ? "Log in" : "Sign up"}
        >
          <button
            className="auth-modal__backdrop"
            type="button"
            aria-label="Close"
            onClick={closeAuth}
          />
          <div className="auth-modal__panel">
            <button
              className="auth-modal__close"
              type="button"
              aria-label="Close"
              onClick={closeAuth}
            >
              x
            </button>
            {authMode === "login" ? (
              <LoginSection onLogin={handleLoginSuccess} />
            ) : (
              <SignupSection onSignupSuccess={closeAuth} />
            )}
            <div className="auth-modal__switch">
              {authMode === "login" ? (
                <>
                  <span>New to TravelSphere?</span>
                  <button type="button" onClick={() => setAuthMode("signup")}>
                    Create account
                  </button>
                </>
              ) : (
                <>
                  <span>Already have an account?</span>
                  <button type="button" onClick={() => setAuthMode("login")}>
                    Log in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
