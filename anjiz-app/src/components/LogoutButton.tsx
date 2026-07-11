import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="btn btn-error btn-outline">
      Logout
    </button>
  );
};