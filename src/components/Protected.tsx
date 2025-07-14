import { Navigate } from "react-router-dom";
import useUser from "../store/UserStore";

function Protected({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default Protected;
