import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Asegúrate de que la ruta es correcta

const PrivateRoute = () => {
  const { user } = useAuth(); // Obtén el usuario autenticado del contexto

  return user ? <Outlet /> : <Navigate to="/login" />; // Redirige si no está autenticado
};

export default PrivateRoute;
