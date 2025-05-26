import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// ─── React & React Router ────────────────────────────────────────────
import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


// ─── Context & Routing ──────────────────────────────────────────────
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
        {/* Toast container (top‑right) */}
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}
