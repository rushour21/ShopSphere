import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = useSelector((state) => state.loggedUser);

  if (!user) {
    // not logged in
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // role mismatch
    return <Navigate to="/" replace />;
  }

  return children;
}
