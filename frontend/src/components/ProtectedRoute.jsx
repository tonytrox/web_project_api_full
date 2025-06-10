import { Navigate } from "react-router";

// ProtectedRoute: servira como un filtro para proteger las rutas, validando la sesion del usuario
export default function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  } else {
    return children;
  }
}
