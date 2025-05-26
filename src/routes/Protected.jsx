// src/routes/Protected.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import React from "react";


export default function Protected() {
  const { auth } = useContext(AuthContext);
  return auth.access ? <Outlet /> : <Navigate to="/login" replace />;
}
