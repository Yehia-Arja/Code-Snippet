import { useNavigate } from "react-router-dom";

const useNavBarLogic = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return { logout };
};

export default useNavBarLogic;
