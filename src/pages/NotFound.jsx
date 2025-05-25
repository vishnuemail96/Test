import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "1rem"
    }}>
      <h1 style={{ fontSize: "5rem", marginBottom: "1rem" }}>404</h1>
      <h2 style={{ marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ marginBottom: "2rem" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" style={{
        textDecoration: "none",
        color: "white",
        backgroundColor: "#007bff",
        padding: "0.75rem 1.5rem",
        borderRadius: "4px",
        fontWeight: "bold"
      }}>
        Go to Home
      </Link>
    </div>
  );
}
