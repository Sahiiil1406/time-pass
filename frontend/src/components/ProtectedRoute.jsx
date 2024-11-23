import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
	let authenticated = true;
	return authenticated ? <Outlet /> : <Navigate to="/login" />;
}
