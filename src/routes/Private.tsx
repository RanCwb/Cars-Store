import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { singnedIn, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <div>Carregando...</div>;
  }
  if (!singnedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}