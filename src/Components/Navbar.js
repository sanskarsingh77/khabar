import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ onSearch, darkMode, toggleTheme }) {
  const [query, setQuery] = useState("");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Business", path: "/business" },
    { name: "Technology", path: "/technology" },
    { name: "Science", path: "/science" },
    { name: "Sports", path: "/sports" },
    { name: "Health", path: "/health" },
    { name: "Entertainment", path: "/entertainment" },
  ];

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top khabar-navbar shadow">
      <div className="container-fluid align-items-center">

        {/* Brand */}
        <Link className="navbar-brand fw-bold text-warning" to="/">
          📰 Khabar
        </Link>

        {/* Search */}
        <input
          type="text"
          className="form-control ms-3 d-none d-md-block"
          placeholder="Search news..."
          style={{ maxWidth: "220px" }}
          value={query}
          onChange={handleSearch}
        />

        {/* Dark mode */}
        <button
          className="btn btn-sm btn-outline-light ms-3 d-none d-md-block"
          onClick={toggleTheme}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* Toggler */}
        <button
          className="navbar-toggler ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#khabarNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center nav */}
        <div className="collapse navbar-collapse" id="khabarNavbar">
          <ul className="navbar-nav ms-auto align-items-center">
            {navItems.map((item) => (
              <li className="nav-item" key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link px-3 ${
                      isActive
                        ? "active fw-semibold text-warning"
                        : "text-light"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Saved (RIGHT SIDE – USER ACTION) */}
        <Link
          to="/saved"
          className="btn btn-outline-light ms-3 d-none d-lg-flex align-items-center"
          title="Saved articles"
        >
          <i className="bi bi-bookmark-fill me-1"></i>
          Saved
        </Link>

      </div>
    </nav>
  );
}
