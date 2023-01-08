import { useLocation, Navigate, Outlet } from "react-router-dom";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { RootState } from "../../app/store";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const RequireAuth = () => {
  const token = useTypedSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
export default RequireAuth;
