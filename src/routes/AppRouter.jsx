import { Routes, Route } from "react-router-dom";

// ─── Guards ─────────────────────────────────────────────────────────
import Protected from "./Protected";

// ─── Auth flow (public) ─────────────────────────────────────────────
import Login from "../pages/auth/Login";
import VerifyOtp from "../pages/auth/VerifyOtp";
import Register from "../pages/auth/Register";

// ─── Public pages ───────────────────────────────────────────────────
import Home from "../pages/Home";
import Resources from "../pages/Resources";
import Services from "../pages/Services";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";



// ─── Protected pages ────────────────────────────────────────────────
import Profile from "../pages/Profile";
import EnrolledCourses from "../pages/EnrolledCourses";
import Videos from "../pages/Videos";
import StartPayment from "../pages/StartPayment";
import PaymentVerify from "../pages/PaymentVerify";

// ─── Fallback ───────────────────────────────────────────────────────
import NotFound from "../pages/NotFound";

/**
 * NOTE: <BrowserRouter> lives in src/App.jsx.
 * This component returns the <Routes> tree only.
 */
export default function AppRouter() {
  return (
    <Routes>
      {/* ─── Public routes ────────────────────────────────────────── */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/register" element={<Register />} />

      <Route path="/resources" element={<Resources />} />
      <Route path="/services" element={<Services />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />


      {/* ─── Protected block ──────────────────────────────────────── */}
      <Route element={<Protected />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/enrolled-courses" element={<EnrolledCourses />} />
        <Route path="/videos/:batch_id" element={<Videos />} />
        <Route path="/start-payment/:batch_id" element={<StartPayment />} />
        <Route path="/payment-verify/:batch_id" element={<PaymentVerify />} />
      </Route>

      {/* ─── Catch‑all ─────────────────────────────────────────────── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
