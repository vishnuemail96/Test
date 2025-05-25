import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ─── Context & Routing ──────────────────────────────────────────────
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";

/**
 * Root component — wraps the entire application with:
 *  • <AuthProvider>  → manages JWT tokens & user profile
 *  • <BrowserRouter> → provides client‑side routing
 *  • <AppRouter>     → actual <Routes> tree (incl. protected routes)
 *  • <Toaster>       → global toast notifications
 */
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
